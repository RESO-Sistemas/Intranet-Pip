/**
 * Represents the model to create a sequence diagram.
 */
import { Diagram } from '../diagram';
import { ChildProperty } from '@syncfusion/ej2-base';
import { UmlSequenceParticipantModel, UmlSequenceMessageModel, UmlSequenceFragmentModel, UmlSequenceFragmentConditionModel, UmlSequenceActivationBoxModel } from './sequence-diagram-model';
/**
 * Defines the types of messages used in UML sequence diagrams.
 * Each type determines the style and semantics of the message line.
 */
export declare enum UmlSequenceMessageType {
    /** A synchronous message, typically a method call that waits for a response. */
    Synchronous = "Synchronous",
    /** An asynchronous message, such as an event or signal that does not wait for a response. */
    Asynchronous = "Asynchronous",
    /** A reply message, representing the return from a synchronous call. */
    Reply = "Reply",
    /** A create message, used to indicate the instantiation of a new participant. */
    Create = "Create",
    /** A delete message, indicating the termination of a participant's lifeline. */
    Delete = "Delete",
    /** A self-message, where the sender and receiver are the same participant. */
    Self = "Self"
}
/**
 * Defines the types of fragments supported in a UML sequence diagram.
 */
export declare enum UmlSequenceFragmentType {
    /** Represents a conditional alternative (e.g., if/else branches). */
    Alternative = "Alternative",
    /** Represents a loop fragment (e.g., for, while). */
    Loop = "Loop",
    /** Represents an optional interaction (e.g., an optional message flow). */
    Optional = "Optional"
}
/**
 * Represents an activation box (focus of control) in the UML sequence diagram.
 * Activation boxes indicate the duration a participant is actively processing messages.
 */
export declare class UmlSequenceActivationBox extends ChildProperty<UmlSequenceActivationBox> {
    /**
     * A unique identifier for the activation box.
     * @default undefined
     */
    id: string | number;
    /**
     * The ID of the message that marks the start of the activation.
     * This must match the `id` of a message defined in the model.
     *
     * @default undefined
     */
    startMessageID: string | number;
    /**
     * The ID of the message that marks the end of the activation.
     * This must match the `id` of a message defined in the model.
     *
     * @default undefined
     */
    endMessageID: string | number;
}
/**
 * Represents a participant (lifeline) in the UML sequence diagram.
 * A participant can be an actor or object involved in message exchanges.
 */
export declare class UmlSequenceParticipant extends ChildProperty<UmlSequenceParticipant> {
    /**
     * @private
     * @default 100
     */
    width: number;
    /**
     * @private
     * @default 100
     */
    height: number;
    /**
     * A unique identifier for the participant.
     *
     * This ID is used to reference the participant in messages and other diagram elements.
     *
     * @default undefined
     */
    id: string | number;
    /**
     * The display content of the participant (e.g., class name or actor label).
     *
     * @default ''
     */
    content: string;
    /**
     * Indicates whether the participant is an actor.
     *
     * If `true`, the participant is rendered using an actor (stick figure) symbol.
     * If `false`, the participant is rendered as a rectangle (object lifeline).
     *
     * @default false
     */
    isActor: boolean;
    /**
     * Specifies whether to show a destruction marker (X) at the end of the participant's lifeline.
     *
     * When enabled, the participant is considered to be destroyed at the end of the sequence.
     *
     * @default false
     */
    showDestructionMarker: boolean;
    /**
     * A list of activation boxes for this participant.
     *
     * Activation boxes represent the time periods during which a participant is active
     * (e.g., executing a method or processing a message).
     *
     * ```typescript
     * activationBoxes: [
     *     { id: 'act1', startMessageID: 'MSG1', endMessageID: 'MSG3' }
     * ]
     * ```
     *
     * @default []
     */
    activationBoxes: UmlSequenceActivationBoxModel[];
}
/**
 * Represents a message (interaction) between two participants in a UML sequence diagram.
 * Messages define the communication flow, such as method calls or replies, between lifelines.
 */
export declare class UmlSequenceMessage extends ChildProperty<UmlSequenceMessage> {
    /**
     * A unique identifier for the message.
     *
     * @default undefined
     */
    id: string | number;
    /**
     * The ID of the participant that sends the message.
     *
     * This should match the `id` of a participant defined in the model.
     *
     * @default undefined
     */
    fromParticipantID: string | number;
    /**
     * The ID of the participant that receives the message.
     *
     * This should match the `id` of a participant defined in the model.
     *
     * @default undefined
     */
    toParticipantID: string | number;
    /**
     * Defines the text content or label displayed for the message in the sequence diagram.
     * This typically represents a operation name, or descriptive response.
     *
     * @default ''
     */
    content: string;
    /**
     * Specifies the type of the message, such as synchronous, asynchronous, reply, etc.
     * Determines how the message line is styled and interpreted in the diagram.
     *
     * @default UmlSequenceMessageType.Synchronous
     */
    type: UmlSequenceMessageType;
}
/**
 * Represents a single condition within a UML sequence fragment.
 * Each condition includes a description and references to the messages or sub-fragments it controls.
 */
export declare class UmlSequenceFragmentCondition extends ChildProperty<UmlSequenceFragmentCondition> {
    /**
     * The textual description of the condition (e.g., a Boolean expression or case label).
     *
     * @default ''
     */
    content: string;
    /**
     * The IDs of messages that are included under this condition.
     *
     * @default []
     */
    messageIds: (string | number)[];
    /**
     * The IDs of nested fragments that are included under this condition.
     *
     * @default undefined
     */
    fragmentIds: string[];
}
/**
 * Represents a fragment in a UML sequence diagram.
 * Fragments define conditional or grouped interactions, such as alternatives or loops.
 */
export declare class UmlSequenceFragment extends ChildProperty<UmlSequenceFragment> {
    /**
     * A unique identifier for the fragment.
     *
     * @default undefined
     */
    id: string | number;
    /**
     * Specifies the type of the fragment, such as 'Alternative', 'Loop', or 'Optional'.
     *
     * Determines how the fragment is interpreted and rendered in the diagram.
     *
     * @default UmlSequenceFragmentType.Optional
     */
    type: UmlSequenceFragmentType;
    /**
     * Defines the conditions and corresponding message/fragment references associated with this fragment.
     *
     * Each condition can represent a branch or case in the fragment (e.g., if-else, loop iteration).
     *
     * ```typescript
     * conditions: [
     *   {
     *     content: 'Condition 1',
     *     messageIds: ['MSG1', 'MSG2'],
     *     fragmentIds: ['frag2']
     *   }
     * ]
     * ```
     *
     * @default []
     */
    conditions: UmlSequenceFragmentConditionModel[];
}
/**
 * Defines the model for the diagram.
 */
export declare class UmlSequenceDiagram extends ChildProperty<UmlSequenceDiagram> {
    /**
     * @private
     */
    diagram: Diagram;
    /**
     * @private
     */
    mermaidData: string;
    /**
     * @private
     */
    isLoadedFromMermaid: boolean;
    /**
     * @private
     */
    hideFootBox: boolean;
    /**
     * @private
     */
    activationWidth: number;
    /**
     * @private
     */
    initialLifelineLength: number;
    /**
     * @private
     */
    messageSpacing: number;
    /**
     * @private
     */
    participantWidth: number;
    /**
     * @private
     */
    participantHeight: number;
    /**
     * @private
     */
    margin: number;
    /**
     * Defines the list of participants involved in the UML sequence diagram.
     * Each participant represents a lifeline, such as an actor or an object, that sends or receives messages.
     *
     * ```typescript
     * participants: [
     *     {
     *         id: 'User',
     *         content: 'User',
     *         width: 100,
     *         height: 50,
     *         showDestructionMarker: true,
     *         isActor: true,
     *         activationBoxes: [
     *             { id: 'act1', startMessageID: 'MSG1', endMessageID: 'MSG3' }
     *         ]
     *     },
     *     {
     *         id: 'Server',
     *         content: 'Server',
     *         width: 100,
     *         height: 50,
     *         showDestructionMarker: true,
     *         isActor: false,
     *         activationBoxes: [
     *             { id: 'act2', startMessageID: 'MSG1', endMessageID: 'MSG3' }
     *         ]
     *     }
     * ]
     * ```
     *
     * @aspDefaultValueIgnore
     * @default []
     */
    participants: UmlSequenceParticipantModel[];
    /**
     * Defines the list of messages exchanged between participants in the UML sequence diagram.
     * Messages represent interactions such as method calls or responses between lifelines.
     *
     * ```typescript
     * messages: [
     *     {
     *         id: 'MSG1',
     *         content: 'User sends request',
     *         fromParticipantID: 'User',
     *         toParticipantID: 'Server'
     *     },
     *     {
     *         id: 'MSG2',
     *         content: 'Processing',
     *         fromParticipantID: 'Server',
     *         toParticipantID: 'Server'
     *     },
     *     {
     *         id: 'MSG3',
     *         content: 'Server sends response',
     *         fromParticipantID: 'Server',
     *         toParticipantID: 'User'
     *     }
     * ]
     * ```
     *
     * @aspDefaultValueIgnore
     * @default []
     */
    messages: UmlSequenceMessageModel[];
    /**
     * Defines the interaction fragments in the UML sequence diagram.
     * Fragments are used to group messages under specific control structures such as loops, alternatives, or options.
     *
     * ```typescript
     * fragments: [
     *     {
     *         id: 'frag1',
     *         type: 'Optional',
     *         conditions: [
     *             {
     *                 content: 'Interactions',
     *                 messageIds: ['MSG1', 'MSG2', 'MSG3']
     *             }
     *         ]
     *     }
     * ]
     * ```
     *
     * @aspDefaultValueIgnore
     * @default []
     */
    fragments: UmlSequenceFragmentModel[];
    /**
     * Defines the horizontal spacing between each participant (lifeline) in the UML sequence diagram.
     *
     * This spacing determines how far apart the participant boxes are placed,
     * which affects the overall layout and readability of the diagram.
     *
     * ```typescript
     * const model: UmlSequenceDiagramModel = {
     *     spaceBetweenParticipants: 120,
     *     participants: [ ... ],
     *     messages: [ ... ],
     *     fragments: [ ... ]
     * };
     * ```
     *
     * - A higher value increases the distance between participants.
     * - A lower value makes participants appear closer together.
     *
     * @default 100
     */
    spaceBetweenParticipants: number;
    private model;
    /**
     *
     * @param {string} mermaidText - mermaid text
     * @param {Diagram} diagram - diagram
     * @returns {void}
     * @private
     */
    parse(mermaidText: string, diagram: Diagram): void;
    /**
     * Positon nodes and Connect connectors to draw sequence diagram
     * based on internal model SequenceDiagramModel object obtained from mermaid data
     * @param {string} mermaidText - mermaid data
     * @param {Diagram} diagram - Diagram
     * @returns {void}
     * @private
     */
    loadDiagramFromMermaid(mermaidText: string, diagram: Diagram): void;
    /**
     * Generates mermaid data from the sequence diagram
     * @returns {string} - mermaid data
     * @private
     */
    generateMermaidFromModel(): string;
    /**
     * Updates the sequence diagram at runtime.
     * @param {Diagram} diagram - Diagram instance
     * @returns {void}
     * @private
     */
    updateUmlSequenceDiagram(diagram: Diagram): void;
    /**
     * update activations and fragments after nodes & connector initialization
     * @returns {void}
     * @private
     */
    render(): void;
}
