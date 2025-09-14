class ContactService {
 contacts = [
  { id: 1, key: 'Phone', value: '+994 50 123 45 67', type: 'text' },
  { id: 2, key: 'Email', value: 'support@example.com', href: 'mailto:support@example.com', type: 'link' },
  { id: 3, key: 'Website', value: 'example.com', href: 'https://example.com', type: 'link' },
  { id: 4, key: 'Fax', value: '+994 12 345 67 89', type: 'text' },
  { id: 5, key: 'Live Chat', value: 'Chat Now', href: 'https://example.com/chat', type: 'link' },
];



  async get() {
    return this.contacts;
  }
}

export const contactService = new ContactService();
