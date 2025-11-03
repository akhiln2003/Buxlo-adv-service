import { BadRequest } from "@buxlo/common";
import { Adv } from "../../domain/entities/adv.entites";
import { IAdvRepository } from "../../domain/interfaces/IAdvRepository";
import { AdvSchema } from "../database/mongodb/schema/adv.schema";

export class AdvRepository implements IAdvRepository {
  async create(adv: Adv): Promise<Adv> {
    try {
      const newAdv = AdvSchema.build({
        _id: adv.id as string,
        image: adv.image,
        title: adv.title,
        description: adv.description,
      });
      return await newAdv.save();
    } catch (error: any) {
      throw new BadRequest(`${error.message}`);
    }
  }

  async getAdvDetails(
    page: number
  ): Promise<{ advs: Adv[]; totalPages: number } | null> {
    try {
      const limit = 5; // Number of users per page
      const skip = (page - 1) * limit;

      const totalCount = await AdvSchema.countDocuments();
      const totalPages = Math.ceil(totalCount / limit);
      const advs = await AdvSchema.find()
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limit);

      return { advs, totalPages };
    } catch (error: any) {
      console.error(error);

      throw new Error(`db error to fetch user: ${error.message}`);
    }
  }

  async delete(id: string): Promise<string> {
    try {
      const data = await AdvSchema.findByIdAndDelete(id);
      console.log("======data===== ", data);
      return data
        ? "Successfully deleted ADV image"
        : "Faild to deleted ADV image";
    } catch (error: any) {
      console.error(error);

      throw new Error(`db error to delete user: ${error.message}`);
    }
  }
  async update(
    id: string,
    data: { title?: string; description?: string; image?: string }
  ): Promise<Adv> {
    try {
      const updatedData = await AdvSchema.findByIdAndUpdate(
        id,
        { $set: data },
        { new: true }
      );
      if (!updatedData)
        throw new BadRequest("Faild to update tryagainb laiter ");
      return updatedData;
    } catch (error: any) {
      console.error(error);

      throw new Error(`db error to edit user: ${error.message}`);
    }
  }
  async getAllAdvKey(): Promise<string[]> {
    try {
      // Fetch only the image field for all documents
      const allDocs = await AdvSchema.find({}, { image: 1, _id: 0 }).lean();

      // Extract and validate string values
      const imageKeys = allDocs
        .map((doc) => doc.image)
        .filter(
          (key): key is string => typeof key === "string" && key.trim() !== ""
        );

      return imageKeys;
    } catch (error: unknown) {
      if (error instanceof Error)
        throw new Error(`DB error fetching adv keys: ${error.message}`);
      throw new Error("Unknown error while fetching adv keys");
    }
  }
}
