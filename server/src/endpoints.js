import { ROLE_MANAGER } from "./constant.js";
import * as fs from "fs";
import { v4 as uuidv4 } from 'uuid';

const data = fs.readFileSync("./src/db.json", "utf8");

const DB_DATA = JSON.parse(data);

const writeOnfile = (data) => {
  fs.writeFileSync("./src/db.json", JSON.stringify(data, null, 2))
}

function routes(app) {

  // Get employees
  app.get('/employees', (req, res) => {
    res.send(DB_DATA.filter(val => val.role === ROLE_MANAGER.EMPLOYEE));
  });

  // Get Dpendent 
  app.get('/dependents/:id', (req, res) => {
    const data = DB_DATA.find(val => {
      return val?.role === ROLE_MANAGER.EMPLOYEE && val?.id == req.params.id;
    });
    res.send(data || {});
  });

  // Get Login Detail 
  app.post('/login', (req, res) => {
    const data = DB_DATA.find(val => val.userName.toLowerCase() === req.body.userName.toLowerCase() && val.password === req.body.password);
    res.send(data);
  });

  // Add new dependent
  app.post('/add-dependent', (req, res) => {
    const data = DB_DATA.map(val => {
      if (val.id == req.body.empId && val?.role === ROLE_MANAGER.EMPLOYEE) {
        val.dependents = [
          ...val.dependents,
          {
            id: uuidv4(),
            name: req.body.name,
            dob: req.body.dob,
            relation: req.body.relation
          }
        ];
        return val;
      }
      return val;
    });
    writeOnfile(data);
    res.send("success");
  });

  // Edit dependent
  app.put('/edit-dependent', (req, res) => {
    const data = DB_DATA.map(val => {
      if (val.id == req.body.empId && val?.role === ROLE_MANAGER.EMPLOYEE) {
        val.dependents = val.dependents.map(dependent => {
          if (dependent.id == req.body.deptId) {
            return {
              ...dependent,
              name: req.body.name,
              dob: req.body.dob,
              relation: req.body.relation
            }
          }
          return dependent;
        });
        return val;
      }
      return val;
    });
    writeOnfile(data);
    res.send("success");
  });

  // Delete dependent
  app.delete('/delete-dependent/:empId/:deptId', (req, res) => {
    const data = DB_DATA.map(val => {
      if (val.id == req.params.empId && val?.role === ROLE_MANAGER.EMPLOYEE) {
        val.dependents = val.dependents.filter(dependent => {
          return (dependent.id != req.params.deptId)
        });
        return val;
      }
      return val;
    });
    writeOnfile(data);
    res.send("success");
  });
}

export default routes;
