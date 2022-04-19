
import { BloggerType, bloggers } from "./db";

type ErrorType = {
  data: {
    id?: number;
    name?: string;
    youtubeUrl?: string;
    title?: string;
    shortDescription?: string;
    content?: string;
    bloggerID?: string;
    bloggerName?: string;
  };
  errorMessage: {
    message?: string;
    field?: string;
  };
  resultCode: number;
};

export let error: ErrorType = {
  data: {},
  errorMessage: {},
  resultCode: 0,
};

const re = /^https:\/\/([\w-]+\.)+[\w-]+(\/[\w-]+)*\/?$/;

const isValidYoutubeURI = (field: string, regex: any) => {
  return regex.test(field);
};

export const bloggersRepository = {
  getAllBloggers() {
    return bloggers;
  },
  getBlogger(id: number) {
    const blogger = bloggers.find((b: BloggerType) => b.id === id);
    return blogger;
  },

  createBlogger(name: string, youtubeUrl: string) {
    if (!isValidYoutubeURI(youtubeUrl, re)) {
      error.data = {
        youtubeUrl: youtubeUrl,
      };
      error.errorMessage = {
        message: "invalid youtube URI",
        field: "youtubeUrl",
      };
      error.resultCode = 1;

      return error;
    } else {
      const newBlogger: BloggerType = {
        id: Number(bloggers.length + 1),
        name: name,
        youtubeUrl: youtubeUrl,
      };
      bloggers.push(newBlogger);
      return newBlogger;
    }
  },

  updateBlogger(id: number, name: string, youtubeUrl: string) {
    const blogger = bloggers.find((b: BloggerType) => b.id === id);
    const bloggerIndex = bloggers.findIndex((b: BloggerType) => b.id === id);

    if (isNaN(id) || !blogger) {
      error.errorMessage = {
        message: "Invalid ID  or blogger doesn't exists",
        field: "id",
      };
      return error;
    } else if (!isValidYoutubeURI(youtubeUrl, re)) {
      error.errorMessage = {
        message: "invalid youtube URI",
        field: "youtubeURI",
      };
      return error;
    } else {
      const updatedBlogger: BloggerType = {
        id,
        name,
        youtubeUrl,
      };

      bloggers.splice(bloggerIndex, 1, updatedBlogger);
      return updatedBlogger;
    }
  },

  deleteBlogger(id: number) {
    const blogger = bloggers.find((b: BloggerType) => b.id === id);

    if (isNaN(id) || !blogger) {
      error.errorMessage = {
        message: "Invalid ID  or blogger doesn't exists",
        field: "id",
      };
      return error;
    }
    const bloggerIndex = bloggers.findIndex((b: BloggerType) => b.id === id);
    bloggers.splice(bloggerIndex, 1);
    return bloggers;
  },
};
