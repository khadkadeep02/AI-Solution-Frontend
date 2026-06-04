// modelSchemas (plain JS)
// Auto-derived from Django models. Each field maps directly to a form control.

// Field and model shapes (kept as docs):
// FieldType: 'text' | 'textarea' | 'number' | 'boolean' | 'image' | 'url' | 'email' | 'select' | 'datetime' | 'json-tags'
// FieldSchema: { name, label, type, required?, options?, min?, max?, placeholder?, hint? }
// ModelSchema: { endpoint, title, displayField: (item) => string, fields: FieldSchema[] }

// ─── Service ──────────────────────────────────────────────────────────────────
const serviceSchema = {
  endpoint: "services",
  title: "Services",
  displayField: (i) => String(i.title ?? ""),
  fields: [
    { name: "title",             label: "Title",             type: "text",     required: true,  placeholder: "e.g. UI/UX Design" },
    { name: "image",              label: "Image",        type: "image",     required: true,  placeholder: "", hint: "Tabler icon class name" },
    { name: "short_description", label: "Short description", type: "textarea", required: true,  placeholder: "One-line summary shown on cards" },
    { name: "full_description",  label: "Full description",  type: "textarea", required: true,  placeholder: "Detailed service description" },
  ],
};

// ─── Project ──────────────────────────────────────────────────────────────────
const projectSchema = {
  endpoint: "projects",
  title: "Projects",
  displayField: (i) => String(i.title ?? ""),
  fields: [
    { name: "title",             label: "Title",             type: "text",      required: true },
    { name: "image",             label: "Cover image",       type: "image",     required: true },
    { name: "short_description", label: "Short description", type: "textarea",  required: true },
    { name: "full_description",  label: "Full description",  type: "textarea",  required: true },
    { name: "technologies",      label: "Technologies",      type: "json-tags", hint: "Press Enter to add a tag" },
    { name: "client_name",       label: "Client name",       type: "text",      placeholder: "e.g. Acme Corp" },
    { name: "project_url",       label: "Project URL",       type: "url",       placeholder: "https://…" },
  ],
};

// ─── Team Member ──────────────────────────────────────────────────────────────
const teamMemberSchema = {
  endpoint: "team-members",
  title: "Team Members",
  displayField: (i) => String(i.name ?? ""),
  tableFields: [
    { name: "image", label: "Photo", type: "image" },
    { name: "designation", label: "Designation" },
    { name: "display_order", label: "Order" },
  ],
  fields: [
    { name: "name",          label: "Full name",    type: "text",    required: true },
    { name: "designation",   label: "Designation",  type: "text",    required: true, placeholder: "e.g. Senior Developer" },
    { name: "bio",           label: "Bio",          type: "textarea",required: true },
    { name: "image",         label: "Photo",        type: "image",   required: true },
    { name: "linkedin_url",  label: "LinkedIn URL", type: "url",     placeholder: "https://linkedin.com/in/…" },
    { name: "github_url",    label: "GitHub URL",   type: "url",     placeholder: "https://github.com/…" },
    { name: "display_order", label: "Display order",type: "number",  min: 0, placeholder: "0" },
  ],
};

// ─── Company Timeline ─────────────────────────────────────────────────────────
const timelineSchema = {
  endpoint: "timeline",
  title: "Timeline",
  displayField: (i) => `${i.year} — ${i.title}`,
  fields: [
    { name: "year",          label: "Year",         type: "number",  required: true, min: 1900, max: 2100, placeholder: "2024" },
    { name: "title",         label: "Milestone",    type: "text",    required: true, placeholder: "e.g. Company founded" },
    { name: "description",   label: "Description",  type: "textarea",required: true },
    { name: "display_order", label: "Display order",type: "number",  min: 0, placeholder: "0" },
  ],
};

// ─── Event ────────────────────────────────────────────────────────────────────
const eventSchema = {
  endpoint: "events",
  title: "Events",
  displayField: (i) => String(i.title ?? ""),
  fields: [
    { name: "title",            label: "Title",            type: "text",     required: true },
    { name: "description",      label: "Description",      type: "textarea", required: true },
    { name: "location",         label: "Location",         type: "text",     required: true, placeholder: "City or Online" },
    { name: "start_date",       label: "Start date & time",type: "datetime", required: true },
    { name: "end_date",         label: "End date & time",  type: "datetime", required: true },
    { name: "image",            label: "Banner image",     type: "image",    required: true },
    {
      name: "event_type", label: "Event type", type: "select", required: true,
      options: [
        { value: "WEBINAR",    label: "Webinar" },
        { value: "WORKSHOP",   label: "Workshop" },
        { value: "CONFERENCE", label: "Conference" },
        { value: "MEETUP",     label: "Meetup" },
        { value: "TRAINING",   label: "Training" },
      ],
    },
    { name: "registration_url", label: "Registration URL", type: "url",      placeholder: "https://…" },
  ],
};

// ─── Gallery Image ────────────────────────────────────────────────────────────
const gallerySchema = {
  endpoint: "gallery",
  title: "Gallery",
  displayField: (i) => String(i.title ?? ""),
  fields: [
    { name: "title",         label: "Title",        type: "text",  required: true },
    { name: "image",         label: "Image",        type: "image", required: true },
    { name: "category",      label: "Category",     type: "text",  required: true, placeholder: "e.g. Office, Events, Work" },
    { name: "display_order", label: "Display order",type: "number",min: 0, placeholder: "0" },
  ],
};

// ─── Testimonial ──────────────────────────────────────────────────────────────
const testimonialSchema = {
  endpoint: "testimonials",
  title: "Testimonials",
  displayField: (i) => String(i.client_name ?? ""),
  fields: [
    { name: "client_name",  label: "Client name",  type: "text",    required: true },
    { name: "company",      label: "Company",      type: "text",    required: true },
    { name: "designation",  label: "Designation",  type: "text",    required: true },
    { name: "image",        label: "Photo",        type: "image",   required: true },
    { name: "rating",       label: "Rating (1–5)", type: "number",  required: true, min: 1, max: 5, placeholder: "5" },
    { name: "review",       label: "Review",       type: "textarea",required: true },
  ],
};

// ─── Contact Inquiry ─────────────────────────────────────────────────────────
const inquirySchema = {
  endpoint: "inquiries",
  title: "Contact Inquiries",
  displayField: (i) => String(i.full_name ?? ""),
  fields: [
    { name: "full_name",           label: "Full name",          type: "text",    required: true },
    { name: "email",               label: "Email",              type: "email",   required: true },
    { name: "phone",               label: "Phone",              type: "text",    required: true },
    { name: "company",             label: "Company",            type: "text" },
    { name: "country",             label: "Country",            type: "text",    required: true },
    { name: "designation",         label: "Designation",        type: "text" },
    { name: "project_description", label: "Project description",type: "textarea",required: true },
    {
      name: "status", label: "Status", type: "select", required: true,
      options: [
        { value: "NEW",         label: "New" },
        { value: "IN_PROGRESS", label: "In Progress" },
        { value: "COMPLETED",   label: "Completed" },
      ],
    },
  ],
};


// ─── Registry ─────────────────────────────────────────────────────────────────
export const schemaRegistry = {
  services:     serviceSchema,
  projects:     projectSchema,
  "team-members": teamMemberSchema,
  timeline:     timelineSchema,
  events:       eventSchema,
  gallery:      gallerySchema,
  testimonials: testimonialSchema,
  inquiries:    inquirySchema,
};
