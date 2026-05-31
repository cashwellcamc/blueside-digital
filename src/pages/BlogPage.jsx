import { Link } from 'react-router-dom';
import './BlogPage.css';

/* ─── PLACEHOLDER ICONS ─────────────────────────────────────────────────── */
const AdobeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M13.966 22.624l-1.69-4.281H8.122l3.892-9.144 5.662 13.425zM8.884 1.376H0v21.248zm14.232 0h-8.884L22 22.624z" />
  </svg>
);

const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
  </svg>
);

const PillIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M4.22 11.29l6.34-6.34c1.9-1.9 5.02-1.9 6.92 0l1.56 1.56c1.9 1.9 1.9 5.02 0 6.92l-6.34 6.34c-1.9 1.9-5.02 1.9-6.92 0l-1.56-1.56c-1.9-1.9-1.9-5.02 0-6.92zm1.41 5.07l1.56 1.56c1.17 1.17 3.07 1.17 4.24 0L15 14.35 9.65 9l-3.56 3.56c-1.17 1.17-1.17 3.07-.46 3.8zm5.59-9.19l5.35 5.35 1.15-1.15c1.17-1.17 1.17-3.07 0-4.24l-1.56-1.56c-1.17-1.17-3.07-1.17-4.24 0l-.7.6z"/>
  </svg>
);

const PatternGrid = ({ children, count = 24 }) => (
  <div className="blog-placeholder-grid">
    {Array.from({ length: count }, (_, i) => (
      <span key={i} className="blog-placeholder-icon">{children}</span>
    ))}
  </div>
);

/* ─── ARTICLE DATA ─────────────────────────────────────────────────────────
   Paste article content into the `body` fields below.
   Each article renders a title, optional date, image, and body content.
   Set `image` to an imported asset or URL string, or leave null for placeholder.
──────────────────────────────────────────────────────────────────────────── */

const ARTICLES = [
  {
    id: 1,
    title: 'What I Learned Getting Veeva Engage Technical Certified: Inside the World of Pharma CLM Development',
    date: 'May 23, 2026',
    image: null,
    placeholder: <PatternGrid><PillIcon /></PatternGrid>,
    body: (
      <>
        <p>In mid 2025, I completed my Veeva Engage Technical Certification v5 while working across CLM client engagements in the pharmaceutical and life sciences space. Having the coursework running alongside active development work gave me a useful perspective on both. Here is what the certification covers, what I observed going through it, and what the Veeva ecosystem actually involves for developers encountering it for the first time.</p>

        <h3>What Veeva Actually Is</h3>
        <p>Veeva Systems is the dominant CRM and content platform in the pharmaceutical and life sciences industry. Its products are deeply embedded in how pharma companies manage their commercial operations, from how sales representatives interact with healthcare providers, to how promotional content is created, reviewed, approved, and deployed to the field.</p>
        <p>The two Veeva products most relevant to developers are Veeva Vault and Veeva CRM. Vault is a cloud-based content management system that pharma companies use to store, manage, and route content through approval workflows. Veeva CRM is the sales rep-facing application, built on a Salesforce foundation, that pharmaceutical sales representatives use during in-person and remote meetings with healthcare providers.</p>
        <p>Within Veeva CRM sits the Closed Loop Marketing module, commonly called CLM. This is where interactive promotional presentations live: the visual, interactive content that sales reps present to physicians and key opinion leaders during a detail call. Building and deploying that content is what Veeva Engage Technical Certification is designed to validate.</p>
        <p>Alongside CLM, Veeva Multichannel also encompasses Approved Email, a channel that allows reps to send pre-approved, regulatory-compliant email content directly to healthcare providers from within the CRM. As a developer in this ecosystem you encounter Approved Email as a separate content type with its own technical requirements, sitting alongside CLM as part of the broader multichannel strategy.</p>

        <h3>PromoMats: The Regulatory Backbone</h3>
        <p>Before a single piece of promotional content reaches a sales rep's iPad, it has to survive one of the most rigorous approval processes in any industry. PromoMats is Veeva's Medical Legal Regulatory review and approval system, the workflow through which every piece of pharma promotional material passes before it is cleared for use in the field.</p>
        <p>The MLR process involves multiple review stages: medical review to ensure clinical accuracy, legal review to assess risk and liability, and regulatory review to confirm the content meets FDA promotional guidelines. Each reviewer can annotate, comment, request changes, or reject content. The workflow is tracked and documented inside Vault, creating an audit trail that demonstrates compliance.</p>
        <p>As a developer working in this ecosystem, understanding PromoMats is not optional. The content you build has to be designed with the MLR process in mind from the start. Claims, references, fair balance language, and ISI, the Important Safety Information that FDA regulations require, all have specific technical requirements for how they are implemented and displayed in CLM presentations. Getting that wrong does not just break the user experience, it creates regulatory exposure for the client.</p>
        <p>This intersection of front-end development and regulatory compliance is what makes Veeva development genuinely different from standard web work. The code has to be correct technically and compliant legally, and those two requirements are evaluated by completely different teams with completely different priorities.</p>

        <h3>The Certification Coursework</h3>
        <p>The Veeva Engage Technical Certification v5 is not a quick exam you cram for over a weekend. The coursework is structured across multiple modules covering the full lifecycle of CLM content development, from understanding the Veeva platform architecture, to building and packaging presentations, to uploading, testing, and troubleshooting in a production environment.</p>
        <p>The curriculum covers Veeva platform fundamentals, CLM content structure and technical requirements, the PromoMats and Vault workflow, the iRep application and how it renders content on device, the distinction between CLM and Engage delivery channels, packaging and deployment procedures, and testing methodologies for verifying content behavior across the Veeva environment. Each module builds on the previous one, and the depth of detail in some sections, particularly around packaging requirements and Vault metadata, requires careful attention.</p>
        <p>The coursework is not passively readable. It requires hands-on engagement with the platform alongside the study material to internalize how everything connects, which is why completing it alongside active client work is a natural fit.</p>

        <h3>CLM vs Engage: Two Channels, One Content Ecosystem</h3>
        <p>One of the more important distinctions to understand early is the difference between CLM and Engage as delivery channels. CLM is the in-person channel: a sales rep opens the iRep application on an iPad and presents content face-to-face with a healthcare provider. Engage is the remote channel: the rep hosts a virtual meeting and shares CLM content with an HCP who joins remotely on their own device.</p>
        <p>The same content can be used across both channels, but the two environments have meaningfully different technical limitations. Complex CSS transitions, WebGL animations, and complex JavaScript animations may not display correctly to remote Engage participants. Animated GIFs display at a reduced frame rate in Engage. Video content supported in CLM is not supported in the Engage application. Content has to be tested specifically in each delivery context because passing in-person iPad testing does not guarantee correct behavior in a remote Engage session.</p>
        <p>The platform field on a key message configuration also determines channel routing. Setting the wrong publish flag in Vault, Publish for Veeva CRM versus Publish for Portals, will cause content to appear in the wrong channel or not appear at all. These configuration details are where small mistakes create significant troubleshooting overhead.</p>

        <h3>Building CLM Presentations: The Technical Reality</h3>
        <p>CLM presentations are at their core HTML5 applications. They are built with HTML, CSS, and JavaScript and run inside the Veeva iRep application on an iPad. If you have built interactive web content before, the underlying technologies are familiar. What is not familiar is the strict technical specifications that govern every aspect of how that content must be structured.</p>
        <p>File naming conventions, folder structure, thumbnail requirements, key message configuration files, and media asset specifications all follow Veeva-defined standards that cannot be deviated from without breaking the content in the iRep environment. A thumbnail at the wrong pixel dimensions will cause the presentation to display incorrectly. A configuration file with incorrect metadata will prevent the content from loading at all. The tolerance for deviation is essentially zero.</p>
        <p>Interactivity is built using the Veeva CLM JavaScript API, accessed through the com.veeva.clm namespace. This library provides methods for navigating between slides, pulling live CRM data into the presentation, logging engagement activity back to the CRM record, and triggering specific CRM actions from within the HTML content. A call like getDataForCurrentObject allows a presentation to read the current account data and render personalized content dynamically during the detail call. Building a presentation that logs the right data back to the rep's activity record requires understanding how the JavaScript API layer connects HTML content to the Salesforce-based CRM backend.</p>
        <p>Cross-platform rendering is another layer of complexity. CLM content on iOS runs on Mobile WebKit. CLM on CRM Desktop for Windows runs on Internet Explorer 11. CSS and JavaScript behavior differs between these rendering engines in ways that matter for complex animations and interactive elements. Content that looks and functions correctly on an iPad may behave differently on Windows CRM Desktop, and testing has to cover both environments.</p>
        <p>CLM activity tracking is also built into the ecosystem by design. The platform logs viewing duration per slide, reactions to key messages, and associated products for every detail call. This data flows back into the CRM and is what makes CLM a closed loop: marketing can analyze which content is actually being shown, for how long, and to which accounts, and use that data to optimize future content. As a developer you are not just building a presentation, you are building a measurable commercial tool.</p>

        <h3>Packaging: Where Things Get Precise</h3>
        <p>Once a CLM presentation is built and tested, it has to be packaged for upload to Vault. Packaging means assembling the content files into a specific zip structure with the correct folder hierarchy, configuration files, thumbnails, and metadata so that Vault can correctly parse and process the content when it is uploaded.</p>
        <p>The packaging requirements are documented in Veeva's technical specifications but they require careful reading and practical experience to get right consistently. Missing a required file, using an incorrect naming convention, or including files in the wrong location within the zip structure will cause the upload to fail or the content to behave unexpectedly in the iRep environment.</p>
        <p>Packaging errors are not always immediately obvious. Some issues surface at upload time with a clear error message. Others only become apparent when the content is staged on a test device and specific interactions fail to behave as expected. Learning to read packaging errors, trace them back to their source, and fix them efficiently is a skill that develops through repetition.</p>
        <p>Multi-product presentations add another dimension. When a presentation covers multiple products, Vault creates separate versions for each product assignment. A presentation for two drug products assigned to different rep territories will generate two distinct CRM records, one per product, with separate distribution and tracking. Understanding how product assignments affect packaging and distribution is part of getting the content architecture right.</p>
        <p>In agency environments, packaging is often scripted and automated to reduce human error. Build tools handle the assembly of the zip structure, thumbnail generation, and configuration file population from a defined source. But understanding what the automation is doing and why, and being able to debug it when it goes wrong, requires knowing the packaging requirements from first principles.</p>

        <h3>Navigating Vault, CRM, and the Stage/Production Split</h3>
        <p>Working in the Veeva ecosystem means navigating two distinct platforms simultaneously: Vault for content management and approval, and the Salesforce-based Veeva CRM for the rep-facing environment. These are separate applications with separate logins, separate administrative interfaces, and separate workflows that have to stay synchronized. Understanding which platform controls which part of the content lifecycle, and where to look when something is not working, is a significant part of the operational learning curve.</p>
        <p>Vault sends content to one of two environments based on the document's lifecycle state: Staged for internal testing, and Production for live deployment to field reps. Only two versions of a given document can exist in CRM at once, one in stage and one in production, with newer versions overwriting existing ones when published. Knowing which environment you are looking at, and confirming that content has actually landed where you expect it, requires tracing the document state through Vault and verifying the sync status in CRM.</p>
        <p>Cache and sync issues are a recurring operational reality. After configuration changes, content updates, or troubleshooting steps, the standard remediation sequence involves clearing the Veeva Cache in CRM Online and running a Database Refresh on the offline device being tested. These are documented maintenance steps that every developer working in the platform learns to perform as a first response when content is not displaying or behaving as expected.</p>
        <p>The sequence of steps required to get content from a completed build through Vault upload, processing, staging, CRM sync, device refresh, and into a testable state is detailed and unforgiving. Each step has prerequisites, each platform has its own settings to verify, and a mistake at any point in the chain can produce behavior that looks like a code problem when it is actually a configuration or sync issue. Developing a methodical troubleshooting approach is as important as the development skills themselves.</p>
        <p>Vault also enforces API rate limits on CRM requests to protect the integration from overload. In practice this means that bulk operations, such as publishing large volumes of content updates simultaneously, have to be managed carefully to avoid hitting limits that can stall the sync between platforms.</p>

        <h3>Device Testing: The Definitive Verification Step</h3>
        <p>A successful Vault processing status does not guarantee the content will behave correctly on device. It confirms that Vault was able to parse the package, not that the content itself is functionally correct. Device testing is the definitive verification step and it cannot be shortcut.</p>
        <p>Content is pushed to a test iPad through the iRep application and reviewed against a testing protocol covering navigation behavior, interactive element functionality, video playback, data logging to the CRM, CLM activity tracking, and visual rendering at the correct iPad resolution. Each element of the presentation is checked against the approved design and the functional specifications.</p>
        <p>Issues found during device testing get documented, traced back to their source in the code or packaging, fixed, repackaged, reuploaded, and retested. In a regulated environment there is no shortcut to this process. Content that has not been fully tested on device should not advance through the MLR workflow, because issues discovered after regulatory approval create significantly more work to resolve.</p>
        <p>The full cycle from build to packaged to uploaded to staged to device-tested to MLR-ready is rarely linear. Regulatory reviewers request changes that send content back to development. Legal review flags a claim that requires redesigning a slide. A CRM platform update changes rendering behavior that requires code adjustments. Managing content through multiple revision cycles while maintaining version control and keeping the Vault audit trail accurate is a discipline unto itself.</p>

        <h3>What the Certification Actually Taught Me</h3>
        <p>Going through the Veeva Engage Technical Certification process gave me a more complete picture of the ecosystem I had been working within than active project work alone could provide. Day-to-day CLM development is necessarily focused on the immediate task. The certification forced a broader understanding of how each piece connects: how the content I build fits into the PromoMats workflow, how it moves through Vault into CRM, how it eventually reaches a rep's iPad, and what the compliance stakes are at each step.</p>
        <p>It also reinforced something that is easy to take for granted when you are deep in the work: pharma promotional development is genuinely high-stakes in a way that most web development is not. A broken navigation interaction on a marketing website is annoying. A compliance failure in regulated promotional content has legal and regulatory consequences for the client. That context shapes how carefully you approach every technical decision.</p>
        <p>The depth of the coursework reflects the complexity of the platform and the seriousness of the regulatory environment it operates in. For developers working in pharma digital, that depth is not optional. It is the baseline for doing the work correctly.</p>

        <p className="blog-tags">#Veeva #VeevaCRM #CLM #PharmaDigital #LifeSciences #PharmaTech #ClosedLoopMarketing #PromoMats #DigitalHealth #PharmaMarketing</p>
      </>
    ),
  },
  {
    id: 2,
    title: 'AEM vs Everything Else: What Makes Adobe\'s CMS Platform Uniquely Complex',
    date: 'May 23, 2026',
    image: null,
    placeholder: <PatternGrid><AdobeIcon /></PatternGrid>,
    body: (
      <>
        <p>Most content management systems share a recognizable foundation. A database stores content. A templating layer renders it. An admin interface lets editors create and publish pages. WordPress, Drupal, Strapi, Sanity -- different approaches, different strengths, but a common conceptual model that most web developers can orient to quickly.</p>
        <p>Adobe Experience Manager is different in almost every way that matters.</p>
        <p>AEM is not simply a more enterprise version of a familiar CMS. It is a fundamentally different type of platform, built on a different technical stack, with a different content model, a different authoring paradigm, and a different operational topology. Understanding why AEM is so complex, and why organizations that invest in it often struggle to use it to its full potential, starts with understanding what makes it architecturally distinct.</p>

        <h3>A Fundamentally Different Technical Foundation</h3>
        <p>Most enterprise CMS platforms are built on PHP or JavaScript runtimes sitting on top of a relational database. AEM is built on Java. Specifically it runs on Apache Sling, a web framework layered over an OSGi container, which sits on top of a Java Content Repository -- a hierarchical, node-based content store that behaves nothing like a traditional relational database.</p>
        <p>For developers coming from WordPress or Drupal, this is a significant cognitive shift. Content in AEM is not stored in tables and rows. It lives in a tree of nodes with properties, structured more like a filesystem than a database. Querying it, modifying it, and understanding how it maps to what appears on a page requires learning a different mental model entirely.</p>
        <p>The component model follows a similar pattern. AEM components are Java objects defined using Sling models, with dialog configurations stored as content nodes, and rendered using HTL -- Adobe's server-side templating language. Backend AEM developers need to be comfortable across Java, the Sling resource resolution model, and OSGi service configuration simultaneously.</p>
        <p>Getting a working local AEM environment requires a licensed AEM jar file, the correct Java runtime, and Maven for build management. Frontend developers in agency environments often work against a proxy pointed at a shared or pre-configured AEM instance, with their own JavaScript build tooling layered on top -- which can obscure how much infrastructure is running underneath.</p>

        <h3>The Frontend Layer: HTL, Client Libraries, and Modern Build Tooling</h3>
        <p>While the backend of AEM is Java territory, the frontend layer is where most web developers spend their day-to-day time. AEM uses HTL -- formerly called Sightly -- as its server-side HTML templating language. HTL is intentionally designed to keep presentation logic simple and prevent complex business logic from bleeding into templates. It is clean and readable once you understand the syntax, but it behaves differently from Twig, Blade, or standard JavaScript templating that most frontend developers are more familiar with.</p>
        <p>CSS and JavaScript in AEM are managed through client libraries, known as clientlibs. Rather than linking stylesheets and scripts directly in HTML, developers declare client library categories that AEM aggregates, minifies, and serves based on page configuration. Understanding how clientlib categories, dependencies, and embed relationships work is essential for managing frontend assets correctly and avoiding loading conflicts or missing styles in production.</p>
        <p>Modern AEM projects typically introduce a dedicated frontend build module, often called ui.frontend, that separates frontend source code from the AEM component structure. This module uses standard tooling -- webpack, npm, Sass -- to compile and optimize frontend assets before they are included as clientlibs. For frontend developers this is familiar territory, but integrating that build pipeline cleanly with the overall Maven build process requires careful configuration.</p>
        <p>Adobe's Core Components provide a library of pre-built, accessible, and production-ready AEM components that most projects build on as a foundation. They handle common patterns like navigation, image rendering, text, and content fragments out of the box. Frontend developers typically extend or restyle Core Components rather than building from scratch, which accelerates development but requires understanding how Core Component markup and BEM-based CSS patterns work.</p>
        <p>For teams adopting a headless or hybrid approach, the SPA Editor bridges React or Angular applications with AEM's authoring interface. Frontend developers build components in their framework of choice, but those components must be mapped to AEM content models so they remain editable in the author environment. Getting that mapping right -- ensuring components render correctly both in the SPA and in AEM's editing context -- is one of the more nuanced challenges in modern AEM frontend development.</p>

        <h3>Author, Publish, Preview, and Dispatcher: The URL Maze</h3>
        <p>Most CMS platforms have one environment per tier: development, staging, production. AEM introduces a more complex topology within each tier. The author instance is where content is created and managed. The publish instance is where live content is served. The dispatcher sits in front of publish as a caching and security layer. And in modern AEM implementations a preview tier sits between author and publish for content review before activation.</p>
        <p>For content editors this creates a genuinely confusing experience. Changes made on the author instance are not immediately visible on the live site. Content must be explicitly activated, which triggers replication from author to publish. The dispatcher cache then needs to flush before the updated content appears publicly. Following a change through this pipeline means navigating different URLs for each layer, each with different access credentials, each showing a slightly different state of the content.</p>
        <p>Editors learn to trace their changes through a breadcrumb trail of URLs: the author environment to make the change, the preview URL to verify it before activation, the publish URL to confirm replication, and the public-facing URL through the dispatcher to confirm the cache has cleared. For someone who just wants to update a headline, this workflow is not intuitive.</p>
        <p>Replication failures, dispatcher cache issues, and activation queue backlogs are common operational pain points that require developer or administrator intervention to resolve. In other CMS platforms a content editor publishes a page and it is live. In AEM the same action initiates a workflow that can fail at multiple points.</p>

        <h3>Page Authoring: Powerful but Demanding</h3>
        <p>AEM's page authoring experience is genuinely powerful. The Sites editor allows authors to build pages from a library of components, configure them inline, preview at different device sizes, and manage page properties from a single interface. For organizations that invest in building a well-designed component library and train their teams properly, it can be a productive authoring environment.</p>
        <p>But the path to that experience is not straightforward. Component dialogs -- the configuration panels that appear when an author selects a component on the page -- are defined by developers and can range from simple to deeply complex depending on how much flexibility the component needs to support. Poorly designed dialogs create authoring experiences that confuse editors and generate support requests. Well-designed ones require significant upfront investment.</p>
        <p>Editable templates add another layer. Unlike WordPress where a theme controls the page layout, AEM uses a template system where page structures, component policies, and allowed component sets are configured by template authors in a separate administrative interface. Understanding the relationship between page templates, structure mode, and initial content mode is not obvious and takes time to internalize.</p>
        <p>Approval and publication workflows add further complexity. AEM supports configurable content workflows where pages can be routed through review and approval steps before publication. Powerful for organizations with compliance requirements, but another layer of process that editors must navigate and administrators must configure and maintain.</p>

        <h3>The DAM: Asset Management at Enterprise Scale</h3>
        <p>Adobe Experience Manager includes a fully integrated Digital Asset Management system. For large organizations managing thousands of images, videos, documents, and brand assets across multiple markets and channels, this is a genuine differentiator. Assets stored in the AEM DAM can be referenced across pages, automatically renditioned for different screen sizes, tagged for search, and governed with metadata schemas and permission structures.</p>
        <p>In practice the DAM is one of the most commonly underutilized and poorly maintained aspects of enterprise AEM implementations. Assets accumulate without consistent naming conventions or metadata. Folder structures grow organically without governance. Rendition profiles get misconfigured and never audited. The search experience degrades as the asset library grows without curation.</p>
        <p>Maintaining a healthy AEM DAM requires dedicated editorial governance, consistent metadata standards, and periodic audits that most organizations do not resource adequately. The capability is there but realizing it requires ongoing discipline that goes beyond the initial implementation.</p>

        <h3>Security: A Genuine Enterprise Strength</h3>
        <p>Security is one area where AEM's complexity works in its favor. The platform offers a granular permission model built on the Java Content Repository access control framework, allowing organizations to define user and group permissions at the node level across the content tree. This means different teams can be granted precisely scoped access to specific sections of the site without exposing the broader content hierarchy.</p>
        <p>Closed User Groups allow organizations to gate specific content behind authentication, supporting use cases like partner portals, member-only content, and regulated information. Integration with enterprise identity providers via LDAP and SAML makes AEM compatible with existing organizational authentication infrastructure without requiring custom development.</p>
        <p>For regulated industries including pharmaceutical, financial services, and healthcare, AEM's security architecture is frequently a deciding factor. The ability to demonstrate granular content access controls, audit trails, and enterprise authentication integration satisfies compliance requirements that simpler CMS platforms cannot meet without significant custom development.</p>
        <p>AEM as a Cloud Service additionally benefits from Adobe's managed security operations, including regular security patching, infrastructure hardening, and compliance certifications. For organizations without deep internal security expertise, offloading that responsibility to Adobe's cloud service is a meaningful operational advantage.</p>

        <h3>Headless AEM: A Different Way to Use the Same Platform</h3>
        <p>The traditional coupled AEM model where the platform handles both content management and page rendering is increasingly giving way to headless implementations. In a headless AEM setup, the platform serves as a content repository and API layer, delivering structured content via GraphQL or JSON to a decoupled frontend built in React, Next.js, or another modern framework.</p>
        <p>This approach solves some of AEM's most persistent developer experience problems. Frontend developers can work in familiar JavaScript frameworks without needing to understand the full AEM stack. Performance optimization becomes easier when the presentation layer is fully decoupled. The frontend can be deployed and iterated independently of the CMS.</p>
        <p>AEM also supports a middle path via the SPA Editor, which allows single-page applications built in React or Angular to remain editable in the AEM author interface. This preserves the in-context authoring experience while enabling a more modern frontend architecture. The SPA Editor is powerful but adds its own implementation complexity and requires careful alignment between frontend component structure and AEM content models.</p>
        <p>The shift toward headless and hybrid AEM implementations represents a genuine evolution in how organizations get value from the platform. It does not eliminate the underlying complexity of AEM as a content system, but it changes where that complexity lives and who has to manage it.</p>

        <h3>On-Premise vs AEM as a Cloud Service</h3>
        <p>Organizations running AEM face a significant infrastructure decision: on-premise or managed AEM instances versus AEM as a Cloud Service, Adobe's fully managed, auto-scaling cloud offering. The difference between these deployment models is substantial and affects everything from development workflow to operational overhead to licensing cost.</p>
        <p>On-premise and managed AEM deployments give organizations more control over their infrastructure but require dedicated expertise to operate. Server configuration, JVM tuning, replication agent management, dispatcher configuration, and upgrade planning all fall to the organization's engineering and operations teams. The operational surface area is large.</p>
        <p>AEM as a Cloud Service offloads much of that operational complexity to Adobe but introduces its own constraints. The immutable infrastructure model means custom code must follow strict cloud-compatibility guidelines. Local development requires the AEM Cloud Service SDK. Deployment pipelines are managed through Adobe's Cloud Manager. Organizations migrating from on-premise to cloud service implementations often underestimate the code remediation required to meet cloud compatibility standards.</p>
        <p>Neither model is universally better. The right choice depends on organizational technical capacity, compliance requirements, budget, and how much control versus convenience the organization needs. What is clear is that both models require significant ongoing investment to operate well.</p>

        <h3>The Licensing Reality</h3>
        <p>AEM is consistently among the most expensive CMS platforms in the enterprise market. Adobe does not publish standard pricing and licensing is negotiated per organization based on usage tier, number of sites, traffic volume, and which Adobe Experience Cloud products are included. What is consistent is that AEM licensing represents a significant budget commitment relative to open source alternatives.</p>
        <p>The licensing structure is modular. Core AEM Sites is the foundation, but organizations frequently license additional Adobe Experience Cloud products that integrate with AEM: Adobe Analytics, Adobe Target for personalization, Adobe Campaign for marketing automation, and Adobe Asset Link for creative workflow integration. Each adds cost and integration complexity.</p>
        <p>For organizations that fully leverage the Adobe Experience Cloud ecosystem, the integration value can justify the investment. For organizations running AEM primarily as a page management tool without activating its deeper capabilities, the cost-to-value ratio is harder to defend. The licensing conversation is one that should happen at the strategic level, not just the technology selection level.</p>

        <h3>Why Organizations Choose AEM Anyway</h3>
        <p>Given the complexity, the cost, and the steep learning curve, why do large organizations choose AEM? The answer is usually a combination of genuine capability and organizational momentum.</p>
        <p>For global enterprises managing content across dozens of markets, languages, and channels simultaneously, AEM's multi-site management, localization capabilities, and content reuse architecture offer real advantages that simpler platforms cannot match at scale. The ability to manage a global content hierarchy, push updates across hundreds of localized site variants, and maintain brand consistency across markets is a genuinely difficult problem that AEM is built to solve.</p>
        <p>The integration with the broader Adobe Experience Cloud is also a real draw for organizations already invested in Adobe Analytics, Adobe Target, and other Adobe products. AEM as the content backbone of a connected marketing technology stack makes architectural sense when those integrations are actively used.</p>
        <p>The challenge is that many organizations acquire AEM for its ceiling capabilities and then operate it well below that ceiling. The platform is most valuable when its full feature set is activated, governed, and maintained by teams with deep expertise. When that investment is not sustained, the complexity remains but the value does not.</p>

        <h3>What This Means in Practice</h3>
        <p>AEM is not the right platform for every organization, and it is not a platform that can be implemented once and left on autopilot. Its complexity is real and consequential. The organizations that get the most from it are the ones that invest in deep platform expertise, maintain strong governance over content and component architecture, and actively use the capabilities they are paying for.</p>
        <p>Understanding what makes AEM different -- its Java foundation, its content repository model, its frontend templating and client library architecture, its author-publish topology, its authoring complexity, its DAM requirements, its security model, and its licensing structure -- is the starting point for making informed decisions about how to implement it, maintain it, and extract value from it over time.</p>
        <p>For the organizations already committed to AEM, the question is rarely whether to use it. The question is whether they are using it in a way that justifies what it costs.</p>

        <p className="blog-tags">#AEM #AdobeExperienceManager #CMS #WebDevelopment #EnterpriseWeb #FrontendDevelopment #ContentManagement #TechnicalArchitecture</p>
      </>
    ),
  },
  {
    id: 3,
    title: 'The Hidden Cost of Enterprise Drupal: What Years of Technical Debt Actually Look Like',
    date: 'May 17, 2026',
    image: null,
    placeholder: <PatternGrid><i className="devicon-drupal-plain" /></PatternGrid>,
    body: (
      <>
        <p>Most organizations do not realize they have a Drupal problem until it is already expensive. It starts gradually. A module is added to solve a problem. Then another. A custom theme gets built, documented by whoever built it, and then that person leaves. Security patches pile up in the backlog. Content editors work around the CMS rather than with it. The database grows. Queries slow down. Developers stop wanting to touch it.</p>
        <p>Drupal is a powerful and flexible platform. It follows an MVC-inspired architecture where the system separates content data, business logic, and presentation into distinct layers. This separation is a genuine strength when implemented well. The problem is that over time, in real enterprise environments, those boundaries erode. Custom code accumulates in the wrong layers. Business logic ends up embedded in theme templates. Presentation logic bleeds into database queries. The clean architecture that made Drupal attractive becomes harder and harder to recognize underneath years of incremental decisions.</p>
        <p>This is the natural lifecycle of an enterprise Drupal implementation that has not had a dedicated owner. And it is far more common than anyone admits publicly.</p>

        <h3>The Security Patch Treadmill</h3>
        <p>Drupal core releases security updates on a regular cycle. So do the hundreds of contributed modules that most enterprise Drupal sites depend on. Keeping everything current is not a one-time project, it is ongoing infrastructure work that requires dedicated time and expertise.</p>
        <p>In practice, patch cycles get deprioritized in favor of feature work. Updates accumulate. PHP version requirements drift out of alignment with hosting environments. A module update breaks something unexpected. The upgrade path becomes increasingly risky to touch without dedicated engineering time, which creates a paradox: the longer you wait, the more dangerous it becomes to update, and the more dangerous it becomes to leave it.</p>
        <p>The result is organizations running Drupal versions and modules with known vulnerabilities, not because they are negligent, but because the remediation cost keeps getting deferred.</p>

        <h3>The Major Version Problem</h3>
        <p>Unlike many platforms where upgrades are incremental, Drupal major version upgrades have historically been near-complete rebuilds. The migration from Drupal 7 to Drupal 9 was so disruptive that Drupal 7 end-of-life was extended multiple times because a significant portion of the ecosystem simply could not make the jump. Many organizations are still running end-of-life Drupal versions in production today.</p>
        <p>The version problem compounds with module compatibility. A contributed module that is critical to your implementation may not have a version compatible with the latest Drupal core. If the module maintainer has not released a compatible update, organizations are stuck: they cannot upgrade Drupal core without losing the module, and they cannot get security patches for the module without upgrading core. It is a genuine dependency trap that has no clean exit.</p>
        <p>Drupal has made meaningful progress here with its new release cycle that aims to reduce the pain of major version transitions. But the damage of past upgrade cycles is already baked into a significant portion of the enterprise Drupal install base, and the organizations carrying that debt are not always aware of the exposure it represents.</p>

        <h3>The Module Dependency Problem</h3>
        <p>A mature enterprise Drupal install might have 60, 80, or over 100 contributed modules. Each is a dependency. Each has its own update cadence. Each can break something else when updated. The cognitive overhead of understanding what everything does and why it is there compounds over years as institutional knowledge walks out the door with departing developers.</p>
        <p>The complexity deepens when contributed modules have been extended or customized beyond their original scope. A module that started as a standard open source implementation gets patched to accommodate a specific business requirement. Then patched again. The custom code lives in a fork or a separate layer that nobody fully understands anymore, and updating the underlying module means reconciling those divergences carefully or risking broken functionality.</p>
        <p>Custom modules present a similar challenge. Purpose-built for a specific need at a specific point in time, they accumulate alongside the rest of the codebase. When the person who wrote them is gone and the documentation is thin, every change to the surrounding system becomes a potential interaction risk. Testing coverage rarely extends to these custom components, so issues surface in production rather than in a controlled environment.</p>
        <p>Nobody sets out to build a 100-module Drupal site with undocumented custom extensions. It happens incrementally, one reasonable decision at a time. Over time the module list becomes archaeology.</p>

        <h3>When a Module Gets Abandoned</h3>
        <p>The Drupal contributed module ecosystem depends entirely on volunteer maintainers. When a widely used module loses its maintainer, the consequences for organizations depending on it can be significant. Security vulnerabilities go unpatched. Compatibility with new Drupal core versions is never addressed. The module falls off the official supported list.</p>
        <p>At that point organizations face an uncomfortable set of choices: fork the module and take on maintenance themselves, find an alternative and migrate all the content and configuration that depended on it, or continue running unsupported code and accept the associated risk. None of these options is quick or cheap, and the problem is compounded when the deprecated module has been customized, making migration to an alternative even more complex.</p>
        <p>This is not a hypothetical risk. High-profile module deprecations have affected significant portions of the Drupal ecosystem before, and the pattern repeats. Organizations that have not audited their module dependency landscape recently may be running software with no active maintainer and no clear path forward.</p>

        <h3>Content Management Overhead</h3>
        <p>The technical debt is visible to developers. The operational debt is invisible to everyone except the people managing content every day.</p>
        <p>Drupal has made genuine strides with Layout Builder and improved editorial interfaces in recent versions. But most enterprise implementations are not running the latest version with clean configuration. They are running heavily customized setups built over years that accumulate content type sprawl, inconsistent field naming, redundant taxonomies, and authoring workflows that require tribal knowledge to navigate.</p>
        <p>The admin dashboard itself becomes a source of friction over time. Taxonomy management buried several menus deep, permissions spread across overlapping roles that nobody fully understands, field configuration scattered across multiple screens, and a contextual toolbar that confuses new editors. What should be a straightforward content publishing workflow becomes a series of workarounds that get passed down informally from one team member to the next.</p>
        <p>Then there is cache. Drupal relies heavily on caching layers to deliver performance at scale, which is a genuine strength. But cache invalidation issues cause editors to publish content and see stale versions persist on the frontend. The reflexive fix becomes clearing all caches, a slow operation on large sites that should be a last resort but becomes routine. Mysterious behavior gets attributed to cache when the root cause is something else entirely, and the troubleshooting overhead accumulates.</p>
        <p>Content migration is also frequently underestimated. When a redesign or platform change eventually happens, years of inconsistently structured content becomes a significant obstacle. Data that should be portable often is not, because it was entered in formats that made sense at the time but were never designed with migration in mind.</p>

        <h3>Database and Performance Degradation</h3>
        <p>Drupal stores everything in the database: content, configuration, user data, sessions, logs, and entity revisions. Over time, on a site that has been in production for years, the database grows substantially. Revision history accumulates for every piece of content. Watchdog log tables fill up. Cached data layers compound. Database size reaches points where routine operations slow noticeably.</p>
        <p>Drupal Views, the module that powers most listing pages and content displays, generates database queries that range from efficient to deeply problematic depending on how they are configured. A View built without attention to query optimization can hammer the database on every page load. Multiply that across a site with significant traffic and the performance impact becomes a real operational concern.</p>
        <p>Regular database maintenance, including purging old revisions, clearing expired sessions, truncating log tables, and reviewing slow query logs, is essential housekeeping that rarely gets scheduled as formal operational work. When it does not happen, performance degradation is gradual and easy to miss until it becomes significant.</p>

        <h3>Environment Drift: Dev, Stage, and Production</h3>
        <p>A well-maintained Drupal project should have development, staging, and production environments that are as close to identical as possible. In practice, enterprise Drupal environments drift apart over time in ways that create serious operational risk.</p>
        <p>Configuration changes get made directly in production without being captured in configuration management and exported back to the codebase. A hotfix gets applied to production and never backported to dev. The staging database gets stale and stops reflecting real content. Server configurations diverge as different administrators make different decisions across environments over time.</p>
        <p>The result is a deployment process that carries real uncertainty. Something that works in staging breaks in production for reasons that take hours to diagnose. Developers stop trusting their local environments as representative of what will happen when code ships. Hotfixes become the norm because the proper deployment process feels too risky.</p>
        <p>Addressing environment drift requires discipline and tooling investment: proper configuration management via Drupal config sync, containerized local development environments, automated deployment pipelines, and regular database sanitization and sync procedures. These are solvable problems, but they require intentional investment that organizations frequently defer.</p>

        <h3>Backup Strategy as an Afterthought</h3>
        <p>Backup and recovery planning is one of the most commonly deferred aspects of enterprise Drupal operations. Most organizations have some form of backup in place, but fewer have actually tested restoration, verified backup integrity on a regular schedule, or documented recovery procedures in enough detail for someone unfamiliar with the system to execute them under pressure.</p>
        <p>A complete Drupal backup requires both the database and the files directory, including user-uploaded assets. Backing up one without the other produces a restore that is either broken or incomplete. Backup schedules that made sense for a smaller site may not keep pace with the volume of content changes on a mature enterprise property.</p>
        <p>The real test of a backup strategy is not whether backups run, but whether a team can restore a known-good state within an acceptable time window when something goes wrong. Organizations that have never run that test are carrying risk they have not measured.</p>

        <h3>So What Are the Alternatives?</h3>
        <p>There is no universal answer, but the options worth considering are:</p>
        <ul>
          <li><strong>Headless Drupal:</strong> Keep the backend and content architecture you have invested in, but decouple the frontend entirely. Drupal serves content via API to a modern React or Next.js frontend. This preserves institutional content investment while dramatically improving the developer and editor experience on the presentation layer.</li>
          <li><strong>Platform migration:</strong> A full migration to Contentful, Sanity, Strapi, or another modern CMS is the most disruptive option but sometimes the right one, particularly when the existing implementation is so heavily customized that maintenance costs outweigh migration costs.</li>
          <li><strong>Systematic debt reduction:</strong> For organizations not ready for a full migration, a structured audit and remediation program covering modules, environments, content types, database health, and custom code can meaningfully reduce overhead without a full platform change.</li>
          <li><strong>Do nothing:</strong> This is also a choice, and organizations make it more often than they should. The risk is that the cost of eventual intervention grows faster than the cost of deferring it.</li>
        </ul>

        <p className="blog-tags">#Drupal #TechnicalDebt #CMS #WebDevelopment #EnterpriseTech #HeadlessCMS #ContentManagement</p>
      </>
    ),
  },
  {
    id: 4,
    title: 'HHS Just Extended the Section 504 Deadline. Here\'s Why That\'s Not Good News.',
    date: 'May 11, 2026',
    image: null,
    placeholder: <PatternGrid><LockIcon /></PatternGrid>,
    body: (
      <>
        <p>Four days ago, HHS published an Interim Final Rule extending the WCAG 2.1 AA compliance deadline for healthcare organizations from May 11, 2026 to May 11, 2027. A lot of healthcare IT and compliance teams exhaled. They probably should not have.</p>
        <p>I spent the past several weeks conducting WCAG 2.1 accessibility audits on more than 20 independent healthcare practice websites across the country. I was not doing it to chase a deadline. I was doing it because I wanted to understand where the industry actually stood.</p>
        <p>What I found was not encouraging. And an extra year does not fix it.</p>

        <h3>What I Found</h3>
        <p>Across the sites I audited, the average AIM score was around 4.5 out of 10. Several came in below 2. One large multi-specialty practice scored a 1.3. These are not small or obscure organizations. They are established, physician-owned practices serving thousands of Medicare patients across multiple locations.</p>
        <p>The most common issues:</p>
        <ul>
          <li>Empty links that screen readers cannot interpret, making navigation impossible for keyboard-only users</li>
          <li>Missing form labels on patient portal and appointment request forms</li>
          <li>Images without alternative text, leaving visually impaired patients with no context</li>
          <li>Contrast failures making text difficult or impossible to read for low vision users</li>
          <li>Synchronization errors during scanning, suggesting deeper screen reader incompatibility</li>
        </ul>
        <p>These are not cosmetic issues. They are structural barriers that prevent real patients from accessing real healthcare information.</p>

        <h3>Why the Extension Changes Less Than You Think</h3>
        <p>The compliance deadline moved. The underlying obligation did not. Section 504 has prohibited disability-based discrimination in federally funded programs since 1973. The 2024 rule simply gave that obligation a specific technical standard and a deadline.</p>
        <p>The extension does not pause enforcement. HHS Office for Civil Rights can still investigate proactively, without a complaint being filed. ADA litigation in the healthcare sector has been rising steadily and will continue to rise regardless of where the compliance date sits.</p>
        <p>More practically: the organizations I audited did not score poorly because they ran out of time. They scored poorly because accessibility was never a priority. Giving them another year does not change that. It just moves the date.</p>

        <h3>What Actually Needs to Happen</h3>
        <p>Remediation is not as complicated or expensive as most organizations assume. Many of the critical issues I found, including empty links, missing labels, and missing alt text, are code-level fixes that do not require redesigning anything. The site stays the same. The underlying structure gets fixed.</p>
        <p>The organizations that use this extension wisely will treat it as runway, not relief. The ones that treat it as relief will be having this same conversation in April 2027.</p>
        <p>If you manage digital properties for a healthcare organization and want to understand where you stand, feel free to reach out.</p>

        <p className="blog-source">Source: <a href="https://www.hhs.gov/press-room/hhs-extends-mobile-and-web-accessibility-deadline.html" target="_blank" rel="noreferrer">HHS Office for Civil Rights Interim Final Rule, May 7, 2026</a></p>
        <p className="blog-tags">#WebAccessibility #WCAG #HealthcareIT #Section504 #DigitalAccessibility</p>
      </>
    ),
  },
];

export default function BlogPage() {
  return (
    <div className="blog-shell">
      <header className="blog-header">
        <Link to="/" className="blog-back">&#8592; Back</Link>
        <div className="blog-wordmark">
          <span className="blog-wordmark-main">Blue<span>side</span> Digital</span>
          <span className="blog-wordmark-sub">Articles &amp; Insights</span>
        </div>
      </header>

      <main className="blog-main">
        {ARTICLES.map(({ id, title, date, image, placeholder, body }) => (
          <article key={id} className="blog-article">
            <div className="blog-article-meta">
              <span className="blog-article-num">0{id}</span>
              {date && <span className="blog-article-date">{date}</span>}
            </div>
            <h2 className="blog-article-title">{title}</h2>
            <div className="blog-article-image">
              {image
                ? <img src={image} alt={title} />
                : <div className="blog-article-image-placeholder" aria-hidden="true">{placeholder}</div>
              }
            </div>
            <div className="blog-article-body">{body}</div>
          </article>
        ))}
      </main>
    </div>
  );
}
