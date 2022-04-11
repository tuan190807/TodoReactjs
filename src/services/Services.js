let db;
export const TodoServices = {
    createDB() {
        db = window.openDatabase("MYDB", '1.0', 'DB TODO APP', 2 * 1024 * 1024);
        db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS TODO (id unique, name, active)');
        });
    },

    addTodo(request) {
        let idTodo = 0;
        db.transaction(function (tx) {
            tx.executeSql('SELECT MAX(id) id FROM TODO', [], function (tx, results) {
                idTodo = (results.rows[0].id)
            });

        });
        const commandInsert = ('INSERT INTO TODO (id ,name, active) VALUES (?, ?, ?)');
        db.transaction(function (tx) {
            tx.executeSql(commandInsert, [idTodo + 1, request.name, request.active]);
        });
    },

    updateTodo(request) {
        db.transaction(function (tx) {
            tx.executeSql(`UPDATE TODO SET active=${request.active} WHERE id=${request.id}`);
        });
    },

    updateTodoAll(checked) {
        db.transaction(function (tx) {
            tx.executeSql(`UPDATE TODO SET active=${checked}`);
        });
    },

    deleteTodo(id) {
        db.transaction(function (tx) {
            tx.executeSql(`DELETE FROM TODO WHERE id=${id}`);
        });
    },

    deleteCompleted() {
        db.transaction(function (tx) {
            tx.executeSql(`DELETE FROM TODO WHERE active = 1`);
        });
    },

    getList() {
        const todoResult = (tx) => {
            return new Promise((resolve, reject) => {
                tx.executeSql('SELECT * FROM TODO', [], function (tx, results) {
                    resolve(results.rows);
                },
                    (tx, error) => {
                        reject(error);
                    });
            })
        }
        const todoCount = (tx) => {
            return new Promise((resolve, reject) => {
                tx.executeSql('SELECT COUNT(active) FROM TODO WHERE active = 0', [], function (tx, results) {
                    resolve(results.rows[0]);
                },
                    (tx, error) => {
                        reject(error);
                    });
            })
        }
        return new Promise((resolve, reject) => {
            db.transaction(async function (tx) {
                try {
                    const res = await todoResult(tx);
                    const totalCount = await todoCount(tx)
                    const response = {
                        total: Object.values(totalCount)[0],
                        data: Object.values(res)
                    }
                    resolve(response);
                } catch (error) {
                    reject(error)
                    console.log(error);
                }
            });
        })

    }
}