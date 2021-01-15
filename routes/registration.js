const express = require("express");
const router = require("express").Router();
console.log("coming herefffffffffffffffffffff")
const registrationController = require("../controller/registration");
router.post("/registration", registrationController.Registration);
router.post("/registration/upDateTeacher", registrationController.upDateTeacher);
module.exports = router;

