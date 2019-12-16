import { Router } from "express";

interface IController {
  getRouter(): Router;
}

export default IController;
