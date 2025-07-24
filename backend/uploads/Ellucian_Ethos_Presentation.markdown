# Ellucian Ethos Training Presentation

## Slide 1: Title Slide
- **Title**: Ellucian Ethos: Streamlining Higher Education Integration
- **Subtitle**: Unifying Data, Applications, and Users
- **Details**: Presented by [Your Teammate's Name], July 16, 2025
- **Visual**: Ellucian logo or university campus background
- **Presenter Notes**: Introduce Ethos as a solution for simplifying campus IT integrations. Mention the goal: to explore its components and benefits.

## Slide 2: What is Ellucian Ethos?
- Suite of tools for seamless data integration
- Core components:
  - Ethos Integration: Central hub for data exchange
  - Ethos Data Model: Standardizes data formats
  - Ethos Extend: Customizes data models
  - Ethos Data Access: Cloud-based data storage
- **Visual**: Hub-and-spoke diagram of Ethos components
- **Presenter Notes**: Explain Ethos as a unified platform that connects disparate systems, reducing complexity.

## Slide 3: Point-to-Point vs. Ethos Integration
- **Point-to-Point (P2P)**:
  - Direct system connections
  - Problems: Complex, costly (e.g., 10 systems = 45 connections)
- **Ethos Integration**:
  - Single hub connection per app
  - Benefits: Simpler, scalable, cost-effective
- **Visual**: P2P (spaghetti diagram) vs. Ethos (hub model)
- **Presenter Notes**: Use analogy of private phone lines (P2P) vs. a telephone exchange (Ethos) to highlight efficiency.

## Slide 4: Ethos Integration Architecture
- **Authoritative Apps**: Own data (e.g., Banner, Colleague)
  - Publish changes, respond to APIs
- **Subscribing Apps**: Consume data via notifications/APIs
- **Ethos Hub**: Manages data flow with REST APIs
- **Visual**: Flowchart (Authoritative → Ethos → Subscribing)
- **Presenter Notes**: Emphasize how the hub decouples systems, enabling flexibility and scalability.

## Slide 5: Ethos Data Model (EEDM)
- Standardizes data (e.g., “birthDate” vs. “DOB”)
- Key features:
  - Common language across systems
  - Single source of truth
  - Extensible for custom needs
- **Visual**: JSON schema example (e.g., Person resource)
- **Presenter Notes**: Highlight how EEDM eliminates confusion in data naming and structure.

## Slide 6: Messaging Patterns
- **Publish/Subscribe**: Async updates
  - Example: Banner notifies Bookstore of new course
- **Request/Reply**: Sync API calls
  - Example: Elevate creates course via Proxy API
- **Visual**: Diagram comparing Pub/Sub and Request/Reply
- **Presenter Notes**: Explain when to use each pattern (async for updates, sync for real-time).

## Slide 7: Ethos Identity Federation Service (EIFS)
- Cloud-based Single Sign-On (SSO) for Ellucian apps
- Uses SAML 2.0 for secure logins
- Benefits:
  - One login for all apps
  - Cloud-ready, multi-tenant support
- **Visual**: EIFS workflow (User → IdP → EIFS → App)
- **Presenter Notes**: Contrast EIFS (cloud, modern) with EEID (on-premises, legacy).

## Slide 8: Ethos User Provisioning (EUP)
- Syncs user data from ERPs to Identity Providers
- Supports bulk and real-time provisioning
- **EUP vs. EIFS**:
  - EUP: Pushes user data to IdPs
  - EIFS: Manages SSO login
- **Visual**: EUP flow (Banner → EUP → Azure AD)
- **Presenter Notes**: Highlight automation benefits for IT teams managing user accounts.

## Slide 9: Ethos Data Access
- Stores multi-tenant data in the cloud
- Data handling:
  - Initial loads
  - Change notifications for updates
  - Reloads for major changes
- Accessed via GraphQL for efficient queries
- **Visual**: Data flow from ERP to cloud storage
- **Presenter Notes**: Emphasize real-time sync and reduced load on ERPs.

## Slide 10: Ethos Extend
- Customizes data models safely
- Features:
  - Add fields (e.g., “preferredPronouns”)
  - Create new models (e.g., “Parking Permit”)
- Uses GraphQL APIs
- **Visual**: Example of extended Person model
- **Presenter Notes**: Stress flexibility for unique institutional needs without breaking standards.

## Slide 11: Managing Ethos Applications
- **Key Configuration Tabs**:
  - API Keys: Authenticate apps
  - Owned Resources: Define authoritative data
  - Subscriptions: Receive change notifications
- **Monitoring Dashboard**: Tracks app status
- **Visual**: Screenshot of Ethos Integration UI
- **Presenter Notes**: Explain how admins configure and monitor integrations.

## Slide 12: Multi-Owner Support
- Multiple apps can own one resource (e.g., email-types)
- Use cases:
  - Multiple vendors
  - Multi-campus setups
  - Banner Multi-Entity Processing (MEP)
- **Visual**: Diagram of multi-owner scenario (e.g., Banner MEP)
- **Presenter Notes**: Highlight data isolation and routing capabilities.

## Slide 13: API Keys and Security
- **Types**: Unrestricted (flexible) vs. Restricted (IP-specific)
- **Process**: API key → JWT token for API calls
- **Best Practices**:
  - Store keys securely
  - Rotate keys regularly
- **Visual**: JWT token flow (App → Ethos → Token)
- **Presenter Notes**: Stress importance of secure key management.

## Slide 14: Example: Campus Card System
- **One-to-One**: Campus Card per campus connects to Banner MEP
- **Many-to-One**: Single Card System connects to multiple Banner instances
- Uses subscriptions or Proxy API for data access
- **Visual**: Diagram of one-to-one vs. many-to-one integration
- **Presenter Notes**: Explain how Ethos ensures campus-specific data separation.

## Slide 15: Conclusion and Q&A
- **Summary**:
  - Ethos simplifies integrations via a central hub
  - Standardizes data, supports SSO, and allows customization
  - Scalable for complex environments
- **Resources**: github.com/ellucianEthos, elluciancloud.com
- **Visual**: Infographic summarizing Ethos benefits
- **Presenter Notes**: Recap key points, invite questions, and provide contact info.