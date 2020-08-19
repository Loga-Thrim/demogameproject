import { withIronSession } from "next-iron-session";
import cookieoption from '../../config/cookieoption'

function handler(req, res, session) {
  req.session.destroy();

  res.statusCode = 201;
  res.setHeader("Content-Type", "application/json");
  res.end()
}

export default withIronSession(handler, {
  cookieName: "GamesSession",
  cookieOptions: {
    secure: cookieoption
  },
  password: process.env.APPLICATION_SECRET,
});