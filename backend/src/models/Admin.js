import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

export const ADMIN_ROLES = Object.freeze({
  SUPER_ADMIN: 'super_admin',
  HOSPITAL_ADMIN: 'hospital_admin',
  RECEPTIONIST: 'receptionist',
  PSYCHOLOGIST: 'psychologist'
});

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Staff member name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Staff email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid official email address']
  },
  passwordHash: {
    type: String,
    required: [true, 'Staff password is required']
  },
  role: {
    type: String,
    required: [true, 'Staff role is required'],
    enum: {
      values: Object.values(ADMIN_ROLES),
      message: '{VALUE} is not a valid hospital staff role'
    }
  },
  staffCode: {
    type: String,
    required: [true, 'Staff employee badge code is required'],
    unique: true,
    uppercase: true,
    trim: true
  },
  department: {
    type: String,
    default: 'Psychiatry & Clinical Psychology'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      delete ret.passwordHash;
      delete ret.__v;
      return ret;
    }
  }
});

// Pre-save password hashing hook
adminSchema.pre('save', async function(next) {
  if (!this.isModified('passwordHash')) return next();
  try {
    const salt = await bcrypt.genSalt(12);
    this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Compare password method
adminSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.passwordHash);
};

export const Admin = mongoose.model('Admin', adminSchema);

