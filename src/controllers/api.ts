'use strict';

import { NextFunction, Request, Response } from 'express';
import { WriteError } from 'mongodb';

import { default as Role, RoleModel } from '../models/role';

export let postPermission = (req: Request, res: Response, next: NextFunction) => {
  const body = req.body;
  // tslint:disable-next-line:no-console
  console.log('postPermission: body', body.names);

  Role.find({name: {$in: body.names}}, (err: any, roles: RoleModel[]) => {
    if (err) { return next(err); }
    return res.status(200).json({roles});
  });
};
