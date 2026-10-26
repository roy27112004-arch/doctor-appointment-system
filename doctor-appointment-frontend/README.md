# MediCare Doctor Appointment Frontend

React + Vite frontend built around the backend routes supplied for this project.

## Backend expected

Backend server:
`http://localhost:3210`

API base:
`http://localhost:3210/api`

## Run

```bash
npm install
npm run dev
```

If your backend is running somewhere else, copy `.env.example` to `.env` and change:

```env
VITE_API_URL=http://localhost:3210/api
```

## Frontend pages

### Public
- `/`
- `/login`
- `/register`

### Patient
- `/patient`
- `/patient/disease`
- `/patient/prescription`

### Doctor
- `/doctor`
- `/doctor/patients`
- `/doctor/prescribe`
- `/doctor/prescriptions`

## Important backend fixes

The supplied backend currently has a few issues that should be fixed before deployment:

1. Add CORS for the Vite frontend and enable credentials.
2. In `auth.controller.js`, change `res.status.json(...)` to `res.status(...).json(...)`.
3. Declare `isuserexist` with `const` in `login`.
4. Registration sets a cookie named `token`, but protected APIs expect `logtoken`. Use the same cookie name.
5. Registration JWT currently does not contain `role`; include it if registration is intended to authenticate immediately.
6. `disease.model.js` should normally use `ref: "user"` on `patient` if you want `.populate("patient")` to work.
7. JWT verification should be protected with try/catch or centralized auth middleware.
8. `GET /patientlist` should normally return status 200 and avoid the extra nested array.
9. Validate `req.file` before using `req.file.buffer`.
10. For production cross-site cookies, configure appropriate `sameSite` and `secure` options.

## Exact API mapping used

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `POST /api/dis/disease`
- `GET /api/list/patientlist`
- `POST /api/auth/prescribe`
- `GET /api/auth/getmedicine`
- `GET /api/auth/cheakprescribe`

Prescription upload uses `multipart/form-data` with the file field name `prescription`.
