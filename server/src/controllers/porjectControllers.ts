import { Request, Response } from "express";
import { client } from "../lib/prisma";

export const getProjects = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const projects = await client.project.findMany();

    res.json(projects);
  } catch (error: any) {
    res.status(500).json({ message:`Error retriving projects: ${error.message}` });
  }
};

/* CREATE PROJECTS */
export const createProject = async (
    req: Request,
    res: Response
  ): Promise<void> => {

    const { name, description, startDate, endDate } = req.body;

    try {
      const newProject = await client.project.create({
        data: {
            name,
            description,
            startDate,
            endDate,
        }
      })

      res.status(201).json(newProject);
    } catch (error:any) {
      res.status(500).json({ message:`Error creating project: ${error.message}` });
    }
  };
