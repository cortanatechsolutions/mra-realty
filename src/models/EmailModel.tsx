// src/models/EmailModel.ts

export interface AttachmentModel {
  fileName: string;
  content: Uint8Array; // Using Uint8Array for binary data
}

export interface EmailModel {
  toEmail: string;
  fromEmail?: string;
  subject: string;
  body: string;
  isHtml?: boolean;
  ccEmails?: string[];
  bccEmails?: string[];
  attachments?: AttachmentModel[];
}
