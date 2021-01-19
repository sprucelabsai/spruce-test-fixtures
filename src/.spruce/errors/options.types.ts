import { SpruceErrors } from "#spruce/errors/errors.types"
import { SpruceErrorOptions, ErrorOptions as ISpruceErrorOptions} from "@sprucelabs/error"
import { SchemaErrorOptions } from '@sprucelabs/schema'

export interface InvalidTopicErrorOptions extends SpruceErrors.SpruceConversation.InvalidTopic, ISpruceErrorOptions {
	code: 'INVALID_TOPIC'
}

type ErrorOptions = SchemaErrorOptions | SpruceErrorOptions | InvalidTopicErrorOptions 

export default ErrorOptions
