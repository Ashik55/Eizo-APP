export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
	public: {
		Tables: {
			credits: {
				Row: {
					created_at: string
					credits: number
					id: number
					user_id: string
				}
				Insert: {
					created_at?: string
					credits?: number
					id?: number
					user_id: string
				}
				Update: {
					created_at?: string
					credits?: number
					id?: number
					user_id?: string
				}
				Relationships: [
					{
						foreignKeyName: "credits_user_id_fkey"
						columns: ["user_id"]
						isOneToOne: true
						referencedRelation: "users"
						referencedColumns: ["id"]
					},
				]
			}
			daily_rewards: {
				Row: {
					created_at: string
					last_claimed_at: string | null
					user_id: string
				}
				Insert: {
					created_at?: string
					last_claimed_at?: string | null
					user_id: string
				}
				Update: {
					created_at?: string
					last_claimed_at?: string | null
					user_id?: string
				}
				Relationships: [
					{
						foreignKeyName: "public_dailyrewards_id_fkey"
						columns: ["user_id"]
						isOneToOne: true
						referencedRelation: "users"
						referencedColumns: ["id"]
					},
				]
			}
			prompts: {
				Row: {
					created_at: string
					fields: Json | null
					gui_prompts: Json | null
					id: number
					main_prompt_id: number | null
					public: boolean | null
					response_from_novita: Json | null
					status: string
					text_prompt: string | null
					uploaded_image_urls: string[] | null
					user_id: string
				}
				Insert: {
					created_at?: string
					fields?: Json | null
					gui_prompts?: Json | null
					id?: number
					main_prompt_id?: number | null
					public?: boolean | null
					response_from_novita?: Json | null
					status?: string
					text_prompt?: string | null
					uploaded_image_urls?: string[] | null
					user_id: string
				}
				Update: {
					created_at?: string
					fields?: Json | null
					gui_prompts?: Json | null
					id?: number
					main_prompt_id?: number | null
					public?: boolean | null
					response_from_novita?: Json | null
					status?: string
					text_prompt?: string | null
					uploaded_image_urls?: string[] | null
					user_id?: string
				}
				Relationships: [
					{
						foreignKeyName: "prompts_user_id_fkey"
						columns: ["user_id"]
						isOneToOne: false
						referencedRelation: "users"
						referencedColumns: ["id"]
					},
					{
						foreignKeyName: "public_prompts_user_id_fkey"
						columns: ["user_id"]
						isOneToOne: false
						referencedRelation: "users"
						referencedColumns: ["id"]
					},
				]
			}
			published_images: {
				Row: {
					aspect_ratio: string
					created_at: string
					id: number
					prompt_id: number
					uploaded_image_urls: string[]
					user_id: string
				}
				Insert: {
					aspect_ratio?: string
					created_at?: string
					id?: number
					prompt_id: number
					uploaded_image_urls: string[]
					user_id: string
				}
				Update: {
					aspect_ratio?: string
					created_at?: string
					id?: number
					prompt_id?: number
					uploaded_image_urls?: string[]
					user_id?: string
				}
				Relationships: [
					{
						foreignKeyName: "public_published_images_user_id_fkey"
						columns: ["user_id"]
						isOneToOne: false
						referencedRelation: "users"
						referencedColumns: ["id"]
					},
					{
						foreignKeyName: "public_published_promptId_fkey"
						columns: ["prompt_id"]
						isOneToOne: true
						referencedRelation: "prompts"
						referencedColumns: ["id"]
					},
				]
			}
			reactions: {
				Row: {
					created_at: string
					id: number
					published_image_id: number
					reaction_type: string
					user_id: string
				}
				Insert: {
					created_at?: string
					id?: number
					published_image_id: number
					reaction_type: string
					user_id: string
				}
				Update: {
					created_at?: string
					id?: number
					published_image_id?: number
					reaction_type?: string
					user_id?: string
				}
				Relationships: [
					{
						foreignKeyName: "public_reactions_published_image_id_fkey"
						columns: ["published_image_id"]
						isOneToOne: false
						referencedRelation: "published_images"
						referencedColumns: ["id"]
					},
					{
						foreignKeyName: "public_reactions_user_id_fkey"
						columns: ["user_id"]
						isOneToOne: false
						referencedRelation: "users"
						referencedColumns: ["id"]
					},
				]
			}
			reports: {
				Row: {
					created_at: string
					id: number
					prompt_id: number
					user_id: string
				}
				Insert: {
					created_at?: string
					id?: number
					prompt_id: number
					user_id: string
				}
				Update: {
					created_at?: string
					id?: number
					prompt_id?: number
					user_id?: string
				}
				Relationships: [
					{
						foreignKeyName: "public_reports_prompt_id_fkey"
						columns: ["prompt_id"]
						isOneToOne: false
						referencedRelation: "prompts"
						referencedColumns: ["id"]
					},
					{
						foreignKeyName: "public_reports_user_id_fkey"
						columns: ["user_id"]
						isOneToOne: false
						referencedRelation: "users"
						referencedColumns: ["id"]
					},
				]
			}
			transactions: {
				Row: {
					created_at: string
					credits_transaction: number
					id: number
					user_id: string
				}
				Insert: {
					created_at?: string
					credits_transaction: number
					id?: number
					user_id: string
				}
				Update: {
					created_at?: string
					credits_transaction?: number
					id?: number
					user_id?: string
				}
				Relationships: [
					{
						foreignKeyName: "public_transactions_user_id_fkey"
						columns: ["user_id"]
						isOneToOne: false
						referencedRelation: "users"
						referencedColumns: ["id"]
					},
				]
			}
			users: {
				Row: {
					created_at: string
					id: string
					nickname: string | null
					profile_image_url: string | null
				}
				Insert: {
					created_at?: string
					id: string
					nickname?: string | null
					profile_image_url?: string | null
				}
				Update: {
					created_at?: string
					id?: string
					nickname?: string | null
					profile_image_url?: string | null
				}
				Relationships: [
					{
						foreignKeyName: "users_id_fkey"
						columns: ["id"]
						isOneToOne: true
						referencedRelation: "users"
						referencedColumns: ["id"]
					},
				]
			}
		}
		Views: {
			[_ in never]: never
		}
		Functions: {
			[_ in never]: never
		}
		Enums: {
			[_ in never]: never
		}
		CompositeTypes: {
			[_ in never]: never
		}
	}
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
	PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] & PublicSchema["Views"]) | { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
				Database[PublicTableNameOrOptions["schema"]]["Views"])
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
			Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
			Row: infer R
		}
		? R
		: never
	: PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] & PublicSchema["Views"])
		? (PublicSchema["Tables"] & PublicSchema["Views"])[PublicTableNameOrOptions] extends {
				Row: infer R
			}
			? R
			: never
		: never

export type TablesInsert<
	PublicTableNameOrOptions extends keyof PublicSchema["Tables"] | { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Insert: infer I
		}
		? I
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
		? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
				Insert: infer I
			}
			? I
			: never
		: never

export type TablesUpdate<
	PublicTableNameOrOptions extends keyof PublicSchema["Tables"] | { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Update: infer U
		}
		? U
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
		? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
				Update: infer U
			}
			? U
			: never
		: never

export type Enums<
	PublicEnumNameOrOptions extends keyof PublicSchema["Enums"] | { schema: keyof Database },
	EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
		: never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
	? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
	: PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
		? PublicSchema["Enums"][PublicEnumNameOrOptions]
		: never
