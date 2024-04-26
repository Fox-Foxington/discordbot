

// hasRole function
function hasRole(member, roleName) {
    const role = member.guild.roles.cache.find(
        (role) => role.name === roleName
    );
    return role && member.roles.cache.has(role.id);
}

module.exports = {
    hasRole
}