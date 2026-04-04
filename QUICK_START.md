# ⚡ Quick Start - Pre-Registration Feature

## What Was Added

✅ **Pre-registration form** that collects user name and email  
✅ **Supabase integration** to save registration data  
✅ **Form validation** with error handling  
✅ **Success message** with personalized welcome  
✅ **Secure database** with privacy-focused policies  

---

## 🎯 3 Steps to Get Started

### 1️⃣ Create `.env` File
```bash
cp .env.example .env
```

Edit `.env` and add your Supabase credentials:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 2️⃣ Run SQL in Supabase
1. Open Supabase Dashboard → SQL Editor
2. Copy contents of `supabase_migration.sql`
3. Paste and click **Run**

### 3️⃣ Test It!
```bash
npm run dev
```
Click "Download APK Free" button and fill the form!

---

## 📁 Files Modified/Created

### Modified:
- ✏️ `src/components/DownloadSection.jsx` - Added pre-registration modal
- ✏️ `package.json` - Added @supabase/supabase-js dependency

### Created:
- 📄 `src/lib/supabase.js` - Supabase client configuration
- 📄 `.env.example` - Environment variable template
- 📄 `supabase_migration.sql` - Database table creation SQL
- 📄 `PRE_REGISTRATION_SETUP.md` - Detailed setup guide
- 📄 `QUICK_START.md` - This file

---

## 🔑 Key Features

### Form Validation
- ✅ Required fields check
- ✅ Email format validation
- ✅ Real-time error messages

### User Experience
- ✅ Loading state during submission
- ✅ Success confirmation with user's email
- ✅ Clean, modern modal design
- ✅ Easy to close (click outside or X button)

### Data Security
- ✅ Row Level Security enabled
- ✅ Public can only insert (not read)
- ✅ Timestamps automatically recorded
- ✅ Indexed for performance

---

## 📊 View Submissions

In Supabase Dashboard:
1. Go to **Table Editor**
2. Select `pre_registrations`
3. See all registrations with name, email, and timestamp

---

## 🎨 Customization Tips

**Change modal width:**
```jsx
// In DownloadSection.jsx, find the modal-box div
style={{ maxWidth: '480px' }} // Change this value
```

**Modify success message:**
```jsx
// Search for "Welcome to Campus Mytra!" in DownloadSection.jsx
// Edit the text as needed
```

**Add more fields:**
```jsx
// 1. Add to formData state
const [formData, setFormData] = useState({ 
  name: '', 
  email: '',
  phone: '' // New field
});

// 2. Add input field in the form
// 3. Update Supabase table schema
// 4. Update insert query
```

---

## 🚨 Common Issues

| Issue | Solution |
|-------|----------|
| "Environment variables not set" | Create `.env` file with correct values |
| "Failed to submit" | Check if SQL migration was run successfully |
| No data in Supabase | Verify table name is `pre_registrations` |
| Form doesn't open | Check browser console for errors |

---

## 💡 Pro Tips

1. **Test thoroughly** - Try invalid emails, empty fields, etc.
2. **Monitor submissions** - Check Supabase regularly
3. **Backup data** - Export registrations periodically
4. **Add email service** - Integrate SendGrid/Resend to auto-send APK
5. **Prevent duplicates** - Add unique constraint on email column

---

## 📞 Need Help?

Check the detailed guide: `PRE_REGISTRATION_SETUP.md`

Or review:
- Supabase docs: https://supabase.com/docs
- Form validation best practices
- React state management

---

**Ready to launch! 🚀**
