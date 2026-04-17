-- Seed data for E2E testing
INSERT INTO organizations (id, name) VALUES 
('11111111-1111-1111-1111-111111111111', 'Hospital Central')
ON CONFLICT (id) DO NOTHING;

INSERT INTO branches (id, organization_id, name, timezone) VALUES 
('22222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'Sede Principal', 'America/New_York')
ON CONFLICT (id) DO NOTHING;

INSERT INTO users (id, organization_id, email, password_hash, role, full_name) VALUES 
('33333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111', 'dr.house@hospital.com', 'hashed_pass_here', 'DOCTOR', 'Dr. Gregory House')
ON CONFLICT (id) DO NOTHING;
