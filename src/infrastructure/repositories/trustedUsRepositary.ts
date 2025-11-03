import { TrustedUs } from "../../domain/entities/trustedUs.entity";
import { ITrustedUsRepository } from "../../domain/interfaces/ITrustedUsRepository";
import { TrustedUsSchema } from "../database/mongodb/schema/trustedUs.schema";

export class TrustedUsRepository implements ITrustedUsRepository {
  async create({
    id,
    image,
  }: {
    id: string;
    image: string;
  }): Promise<TrustedUs> {
    try {
      const newAdv = TrustedUsSchema.build({
        _id: id,
        image,
      });
      return await newAdv.save();
    } catch (error: any) {
      throw new Error(`db error: ${error.message}`);
    }
  }

  async getTrustedUsDetails(
    page: number
  ): Promise<{ trustedUs: TrustedUs[]; totalPages: number } | null> {
    try {
      const limit = 5; // Number of users per page
      const skip = (page - 1) * limit;

      const totalCount = await TrustedUsSchema.countDocuments();
      const totalPages = Math.ceil(totalCount / limit);
      const trustedUs = await TrustedUsSchema.find()
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limit);

      return { trustedUs, totalPages };
    } catch (error: any) {
      console.error(error);

      throw new Error(`db error to fetch user: ${error.message}`);
    }
  }

  async delete(id: string): Promise<string> {
    try {
      const data = await TrustedUsSchema.findByIdAndDelete(id);

      return data
        ? "Successfully deleted trusted us logo image"
        : "Faild to deleted trusted us logo image";
    } catch (error: any) {
      console.error(error);

      throw new Error(`db error to fetch user: ${error.message}`);
    }
  }

  async getAllAdvKey(): Promise<string[]> {
    try {
      const allDocs = await TrustedUsSchema.find(
        {},
        { image: 1, _id: 0 }
      ).lean();

      // Extract and validate the image keys (ensure they're strings)
      const imageKeys = allDocs
        .map((doc) => doc.image)
        .filter(
          (key): key is string => typeof key === "string" && key.trim() !== ""
        );

      return imageKeys;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Database error:", error.message);
        throw new Error(
          `DB error fetching advertisement keys: ${error.message}`
        );
      } else {
        console.error("Unknown error:", error);
        throw new Error("Unknown error while fetching advertisement keys");
      }
    }
  }
}
