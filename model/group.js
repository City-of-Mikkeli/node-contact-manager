var groupSchema = mongoose.Schema({
  name: String
});

module.exports = mongoose.model('Group', groupSchema);