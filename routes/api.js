// const express = require("express");
// const router = express.Router();

// // middleware
// const auth = require("../middleware/auth");
// const verified = require("../middleware/verified");

// // import group routes
// const roleRoutes = require("./groups/roles");
// const subjectRoutes = require("./groups/subjects");
// const scheduleRoutes = require("./groups/schedules");
// const classroomRoutes = require("./groups/classrooms");
// const majorRoutes = require("./groups/majors");
// const userRoutes = require("./groups/users");
// const examRoutes = require("./groups/exams");

// // === Route global ===
// router.get("/", (req, res) => res.json({ message: "Welcome" }));

// router.get("/dashboard", [auth, verified], (req, res) => {
//     return res.json({ message: "Dashboard" });
// });

// // === GROUP seperti Laravel: Route::middleware(['auth'])->group() ===
// router.use(auth, () => {
//     router.use(roleRoutes);
//     router.use(subjectRoutes);
//     router.use(scheduleRoutes);
//     router.use(classroomRoutes);
//     router.use(majorRoutes);
//     router.use(userRoutes);
//     router.use(examRoutes);
// });

// module.exports = router;
