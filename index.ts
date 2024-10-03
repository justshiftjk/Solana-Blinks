import 'dotenv/config'
import express, { Request, Response } from 'express'
import bodyParser from "body-parser";
import cors from "cors";
import blinkRoutes from './routes/blinkRoutes'
import { ACTIONS_CORS_HEADERS } from "@solana/actions";
const whitelist = ["*"]

const corsOptions = {
  origin: whitelist,
  allowHeaders: ['Content-Type', 'Authorization', 'Accept-Encoding'],
  allowMethods: ['GET', 'POST', 'PUT', 'OPTIONS'],
}

const app = express();

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// simple route
app.get("/", (req: Request, res: Response) => {
  res.send("Fomo mint game backend is running. ❤️");
});

app.get('/actions.json', getActionsJson);

// Route handlers
function getActionsJson(req: Request, res: Response) {
  const payload = {
    rules: [
      { pathPattern: '/*', apiPath: '/api/actions/*' },
      { pathPattern: '/api/actions/**', apiPath: '/api/actions/**' },
    ],
  };
  res.set(ACTIONS_CORS_HEADERS);
  res.json(payload);
}

app.use("/api/actions", blinkRoutes);
