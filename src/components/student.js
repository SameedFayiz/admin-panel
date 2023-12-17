import React, { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DataTable from "./dataTable";
import { getCourses, userRegister } from "@/utils/firebase";
// import { useRouter } from "next/navigation";

const StudentTab = () => {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [val, setVal] = useState("");
  const [image, setImage] = useState("");
  const [options, setOptions] = useState({});
  //   const router = useRouter();

  const [open, setOpen] = useState(false);

  const addStudent = async () => {
    if (name && pass && val) {
      await userRegister(name, pass, val, image);
    }
  };
  useEffect(() => {
    (async () => {
      let data = await getCourses();
      console.log(data);
      setOptions(data);
    })();
  }, []);
  return (
    <div className="w-full h-screen flex flex-col p-16">
      <Dialog open={open}>
        <DialogTitle>Add Student</DialogTitle>
        <div className="flex flex-col p-10 gap-4">
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <TextField
            id="pass"
            label="Password"
            variant="outlined"
            onChange={(e) => {
              setPass(e.target.value);
            }}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Select course</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={val}
              label="Select course"
              onChange={(e) => {
                setVal(e.target.value);
              }}
            >
              {options
                ? Array.from(options)?.map((i) => {
                    return (
                      <MenuItem key={i} value={i}>
                        {options.i}
                      </MenuItem>
                    );
                  })
                : ""}
              <MenuItem value={"CS-201"}>CS-201</MenuItem>
              <MenuItem value={"WA-333"}>WA-333</MenuItem>
            </Select>
          </FormControl>
          <div>
            <InputLabel id="image-input">Select Image</InputLabel>
            <input type="file" onChange={(e) => {}} />
          </div>
          <Button
            className="h-full bg-red-600"
            variant="contained"
            onClick={() => {
              setName("");
              setPass("");
              setVal("");
              setImage("");
              setOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            className="h-full bg-green-800"
            variant="contained"
            onClick={() => {
              addStudent();
              setOpen(false);
            }}
          >
            Save
          </Button>
        </div>
      </Dialog>
      <div className="w-full flex  place-items-center bg-slate-300 p-4">
        <PersonIcon
          sx={{ fontSize: 60 }}
          className="h-full me-5 bg-slate-100 rounded-full p-1"
        />
        <p className="text-4xl font-bold">Students</p>
        <div className="ms-auto">
          <Button
            className="h-full bg-blue-700"
            variant="contained"
            onClick={() => {
              setOpen(true);
            }}
          >
            + Add Student
          </Button>
        </div>
      </div>
      <div className="w-full flex-1">
        <DataTable />
      </div>
    </div>
  );
};

export default StudentTab;
