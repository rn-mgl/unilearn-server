import { Router } from "express";
import {
  getAdmin,
  updateAdminInfo,
} from "../../controllers/admin/adminController.js";

const router = Router();

router.route("/:admin_id").get(getAdmin).patch(updateAdminInfo);

export default router;
