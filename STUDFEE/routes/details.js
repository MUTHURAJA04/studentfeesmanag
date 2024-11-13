import express from "express";
import {
  detailcreate,
  detaildelete,
  detailindex,
  detailupdate,
  singledetail,
} from "../contorlers/detailC.js";

const router = express.Router();

router.get("/", detailindex);

router.get("/:id", singledetail );

router.post("/", detailcreate);

router.put("/:id", detailupdate);

router.delete("/:id", detaildelete);

export default router;
