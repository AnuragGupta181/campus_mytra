# Pre-Registration Setup Instructions

## 🚀 Quick Start Guide

### Step 1: Set Up Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project (or use existing one)
2. Once your project is ready, go to **Project Settings** → **API**
3. Copy the following values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (a long string)

### Step 2: Configure Environment Variables

1. Create a `.env` file in your project root:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and replace the placeholder values:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

### Step 3: Create Database Table

1. In your Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy and paste the contents of `supabase_migration.sql`
4. Click **Run** to execute the SQL

This will create:
- ✅ `pre_registrations` table with name, email, and timestamps
- ✅ Index on email for faster queries
- ✅ Row Level Security policies (allows inserts, prevents reads for privacy)

### Step 4: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the Download section
3. Click "Download APK Free" button
4. Fill out the pre-registration form
5. Submit and verify the success message appears

### Step 5: Verify Data in Supabase

1. Go to your Supabase dashboard
2. Navigate to **Table Editor** → **pre_registrations**
3. You should see the submitted data

---

## 🔧 How It Works

### User Flow:
1. User clicks "Download APK Free" button
2. Pre-registration modal opens
3. User enters name and email
4. Form validates the input
5. Data is saved to Supabase
6. Success message displays with personalized welcome
7. User is informed they'll receive the APK via email

### Features:
- ✅ Form validation (required fields, email format)
- ✅ Error handling with user-friendly messages
- ✅ Loading state during submission
- ✅ Success confirmation with user's email
- ✅ Secure data storage in Supabase
- ✅ Privacy-focused (data can only be inserted, not read publicly)

---

## 📊 Viewing Registrations

To view all pre-registrations in Supabase:

1. Go to **Table Editor** in Supabase dashboard
2. Select `pre_registrations` table
3. All submissions will be visible there

Or use SQL:
```sql
SELECT * FROM pre_registrations ORDER BY registered_at DESC;
```

---

## 🔒 Security Notes

- Row Level Security (RLS) is enabled
- Public can INSERT but cannot SELECT (privacy protection)
- Only authenticated admins can view data in Supabase dashboard
- Consider adding email verification for production

---

## 🎨 Customization

You can customize the modal appearance by modifying styles in `DownloadSection.jsx`:
- Modal colors and gradients
- Form field styling
- Success message design
- Button animations

---

## ❓ Troubleshooting

**Issue: "Supabase environment variables are not set"**
- Solution: Make sure `.env` file exists and contains valid credentials

**Issue: "Failed to submit"**
- Check browser console for error details
- Verify Supabase table exists
- Confirm RLS policies are correctly set

**Issue: Form submits but no data in Supabase**
- Check Supabase logs in Dashboard → Logs
- Verify the table name matches (`pre_registrations`)
- Check network tab for API errors

---

## 📝 Next Steps

Consider adding:
- Email notification service (SendGrid, Resend, etc.)
- Duplicate email prevention
- Admin dashboard to view registrations
- Export functionality for email list
- Analytics tracking for conversion rates
