import { updateSender } from "./updateSender";

export const updateHandler = async (updateObject: any) => {
	await updateSender(updateObject)
}