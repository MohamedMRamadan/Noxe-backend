import globalErrMiddleware from "../middlewares/globalErrMiddleware.js";
import authRouter from "./auth/auth.router.js";

const init = (app) => {
  app.use("/auth", authRouter);
  app.use(globalErrMiddleware);
};
export default init;
