import { withIronSession } from "next-iron-session";
import cookieoption from '../../config/cookieoption'

export default withIronSession(
  async (req, res) => {
    if (req.method == "POST") {
      const { token } = req.body;

      if (token) {
        fetch("https://api-cashweb.olafs.co/cs/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": token
          },
        }).then(response=>{
          response.json().then(async result=>{
            const {
              token
            } = result;

            req.session.set("user", {
              token
            });
            
            try{
              await req.session.save()
            } catch(e){
            }

            res.statusCode = 201;
            res.setHeader("Content-Type", "application/json");
            res.end();
          })
        })
      } else{
        res.statusCode = 204;
        res.setHeader("Content-Type", "application/json");
        res.end();
      }
    }
  },
  {
    cookieName: "GamesSession",
    cookieOptions: {
      secure: cookieoption
    },
    password: process.env.APPLICATION_SECRET,
  }
);