/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable no-redeclare */

import { default as SchemaEntity } from '@sprucelabs/schema'
import * as SpruceSchema from '@sprucelabs/schema'





export declare namespace SpruceErrors.SpruceConversation {

	
	export interface InvalidTopic {
		
			
			'topicScript': string
	}

	export interface InvalidTopicSchema extends SpruceSchema.Schema {
		id: 'invalidTopic',
		namespace: 'SpruceConversation',
		name: 'Invalid topic',
		    fields: {
		            /** . */
		            'topicScript': {
		                type: 'text',
		                isRequired: true,
		                options: undefined
		            },
		    }
	}

	export type InvalidTopicEntity = SchemaEntity<SpruceErrors.SpruceConversation.InvalidTopicSchema>

}




