# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

## Ticket 1: Database Modification and Agent Interface Update

**Summary:** Add a new column to the Agents table to save a Facility-specific ID for each Agent. Update the Agent creation/editing interface to allow Facilities to add/edit this ID.

**Acceptance Criteria:**
1. A new column 'facility_id' is added to the Agents table in the database.
2. In the Agent creation/editing interface, Facilities should have the option to enter a 'Facility-specific ID' for each Agent.
3. The Facility-specific ID should be optional. If it's not provided, the system should behave as it currently does.
4. The Facility-specific ID entered by the Facility should be saved in the 'facility_id' column of the Agents table.

**Time/Effort Estimate:** 2 days

**Implementation Details:**
1. Modify the Agents table in the database schema to add a new nullable column 'facility_id'.
2. Update the Agents interface to add a new form field 'Facility-specific ID' for Facilities to enter their custom ID.
3. Update the Agent creation and editing functions in the backend to accept and save this new parameter.

---

## Ticket 2: Update the `getShiftsByFacility` Function

**Summary:** Update the `getShiftsByFacility` function to return the Facility-specific ID if available, along with the other Agent metadata.

**Acceptance Criteria:**
1. The `getShiftsByFacility` function should return the Facility-specific ID (if it exists) of the Agent assigned to each Shift.

**Time/Effort Estimate:** 1 day

**Implementation Details:**
1. Modify the `getShiftsByFacility` function to join the Shifts table with the Agents table on 'agent_id' and select the 'facility_id' along with the other Agent metadata.

---

## Ticket 3: Update the `generateReport` Function

**Summary:** Update the `generateReport` function to use the Facility-specific ID in the generated report if it's available, otherwise use the database ID.

**Acceptance Criteria:**
1. If an Agent has a Facility-specific ID, it should be used in the report instead of the database ID.
2. If an Agent doesn't have a Facility-specific ID, the database ID should be used in the report.

**Time/Effort Estimate:** 1 day

**Implementation Details:**
1. Update the `generateReport` function to check if 'facility_id' is available in the Agent metadata. If it is, use it in the report. If not, use the 'agent_id'.

---

## Ticket 4: Testing and Documentation

**Summary:** Conduct thorough testing of the new feature and update the documentation accordingly.

**Acceptance Criteria:**
1. All functions behave as expected, including edge cases.
2. Documentation is updated with the latest changes.

**Time/Effort Estimate:** 1 day

**Implementation Details:**
1. Test the feature by creating and editing Agents, assigning them to Shifts, and generating reports.
2. Handle any possible exceptions and edge cases.
3. Update the technical documentation to reflect the new feature and its usage.
4. Prepare user manuals and guides for the new interface.

Overall, this project can be expected to take around 5 days of development time to complete.
