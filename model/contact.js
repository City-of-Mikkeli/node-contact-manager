var contactSchema = mongoose.Schema({
  name: String,
  company: String,
  title: String,
  phone: String,
  email: String,
  address: String,
  city: String,
  zipcode: String,
  groups: [String]
});

module.exports = mongoose.model('Contact', contactSchema);