import { User } from "./user";

export interface Cover {
  id?: number;
  user_email: string;
  img_description: string;
  original_description?: string;
  img_size: string;
  img_url: string;
  llm_name: string;
  llm_params?: any;
  created_at: string;
  created_user?: User;
  uuid: string;
  status: number;
  category_id: number;
  category_name?: string; // 将 category_name 标记为可选
  updated_at?: Date;
  slug: string;
}
