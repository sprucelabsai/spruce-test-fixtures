import BaseSpruceError from '@sprucelabs/error'
import ErrorOptions from '#spruce/errors/options.types'

export default class SpruceError extends BaseSpruceError<ErrorOptions> {
	/** An easy to understand version of the errors */
	public friendlyMessage(): string {
		const { options } = this
		let message
		switch (options?.code) {
			case 'MISSING_PARAMETERS':
				message = `Looks like you're missing the following parameters: ${options.parameters.join(
					', '
				)}`
				break

			case 'INVALID_FIXTURE':
				message = `"${
					options.suppliedName
				}" is not a valid fixture. Try: ${options.validNames.join(', ')}.`
				break

			default:
				message = super.friendlyMessage()
		}

		// Drop on code and friendly message
		message = `${options.code}: ${message}`
		const fullMessage = `${message}${
			options.friendlyMessage && options.friendlyMessage !== message
				? `\n\n${options.friendlyMessage}`
				: ''
		}`

		return fullMessage
	}
}
