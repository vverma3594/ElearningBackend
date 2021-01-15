const express = require("express");
const router = require("express").Router();
const TeacherBanckDetailController = require("../controller/bankDetails");

console.log('coming here ');
router.post("/bankDetails", TeacherBanckDetailController.addTeacherBankDetails);
router.get("/bankDetails/getDetail/:teacherId", TeacherBanckDetailController.getTeacherBankDetails);


module.exports = router;