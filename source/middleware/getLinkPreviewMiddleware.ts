import { getLinkPreview } from "../index";
import { Request, Response, NextFunction } from "express";
export const getLinkPreviewMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const url = req.body.url;

  getLinkPreview(url)
    .then((data) => {
      console.log(data);
    })
    .then(() => next())
    .catch((err) => console.error(err));
};
