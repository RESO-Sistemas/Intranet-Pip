---
description: 'Create a Azure Bug and Feature task based on the provided content following the strict template.'
tools: ['read']
model: GPT-5 mini (copilot)
---

# Task creation Instructions

1. Follow the given task and bug template strictly.
2. Do not add unnecessary or exaggerated data or text.
3. Keep the task details minimal.
4. Default to Platform as Typescript if not mentioned.
5. Remove the Sample if not the detail is provided.
6. Remove the Ticket if not provided.
7. Only generate the task content. Donot plan or execute.
6. Donot return here are the details.
7. Skip the notes section if the provided content has no notes.

## Bug Template

**Title:**

  

**Description:**

  

**Ticket:**

  

**Platform:**

  

**Replication Procedure:**

  

**Replication Video:**

  

**Expected Behavior:**

  

**Actual Behavior:**

  

**Sample:**

  

**Note:**

## Task Template

**Title:**

  

**Description:**

  

**Ticket:**

  

**Platform:**

  

**Work Items:**

1.    
    

**Reference Links:**

## Bug Example Output

**Title:**

The AI Assistant Popup position is improper not relative to the Editor Element.

**Description:**

The RIch Text Editor 's AI Assistant popup is not relative to the Editor element instead its relative to the body. When the AI Assistant popup is used in the Sample browser the right positioning is improper due to the improper relative element position calculation.

**Platform:**

Typescript

**Replication Procedure:**

1.  Run the Typescript sample.
2.  Click the AI Query button.
3.  Check the AI Assistant Popup position.

**Expected Behavior:**

The AI Assistant popup position should be relative to the editor root element

**Actual Behavior:**

The AI Assistant popup position is relative to the body element.


## Task Example Output

**Title:**

To add the maxPromptHistory and clearPromptHistory API to the Rich Text Editor

**Description:**

A new property named as maxPrompHistory should be introduced in the AIAssistantSettings and  a new method named clearPromptHistory should be added in the RichTextEditor class.

**Platform:**

Typescript

**Work Items:**

*   To add maxPromptHistory in the AIAsssistantSettings.
*   To add clearPromptHistory in the Rich Text Editor.
*   Resolve issues with the enablePersistance usage in the Assist View.