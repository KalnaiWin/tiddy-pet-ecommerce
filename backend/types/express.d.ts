import { InUser } from "../model/User";
declare global {
  namespace Express {
    interface Request {
      user?: InUser;
    }
  }
}
