const { Interaction } = require("discord.js");

//add role
function addRole(interaction) {
  const role = interaction.options.getRole("role");
  const member = interaction.options.getMember("target");
  member.roles.add(role);
}

//delete role
function deleteRole(interaction) {
  const role = interaction.options.getRole("role");
  const member = interaction.options.getMember("target");
  member.roles.delete(role);
}

//has role
function hasRole(interaction) {
  const member = interaction.options.getMember("target");
  if (member.roles.cache.some((role) => role.name === "role name")) {
  }
}

module.export = {
  addRole,
  deleteRole,
  hasRole,
};
