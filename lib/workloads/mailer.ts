import { Mailer } from "@monolayer/workloads";
import nodemailer from "nodemailer";

export const mailer = new Mailer("app-mailer", (envVar) =>
	nodemailer.createTransport(process.env[envVar], {
		logger: process.env.NODE_ENV === "development",
	}),
);
