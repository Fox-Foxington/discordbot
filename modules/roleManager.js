// eventHandlers.js

function handleGuildMemberAdd(member) {
    const guild = member.guild;
    const role = guild.roles.cache.find(role => role.name === 'New');
    if (role) {
        member.roles.add(role);
    }
}



function handleVerifyCommand(message, adminRoleName, mentionOrId) {
    console.log('handleVerifyCommand triggered');

    const member = message.member;
    const guild = member.guild;
    const newRole = guild.roles.cache.find(role => role.name === 'New');
    const kitRole = guild.roles.cache.find(role => role.name === 'Kit');
    const adminRole = guild.roles.cache.find(role => role.name === adminRoleName);

    if (!adminRole || !newRole || !kitRole) {
        console.log('Required roles not found');
        return;
    }

    // Check if the user has the admin role
    if (!member.roles.cache.has(adminRole.id)) {
        console.log('User does not have admin role');
        return;
    }

    let mentionedUser;

    if (mentionOrId && (mentionOrId.startsWith('<@') && mentionOrId.endsWith('>'))) {
        const userId = mentionOrId.replace(/[\\<>@!]/g, ''); // Remove special characters from the mention
        mentionedUser = guild.members.cache.get(userId);
    } else if (mentionOrId) {
        mentionedUser = guild.members.cache.get(mentionOrId);
    } else {
        console.log('No user mentioned');
        message.reply('You need to mention a user to verify!');
        return;
    }

    if (!mentionedUser) {
        console.log('User not found');
        message.reply('The specified user was not found!');
        return;
    }

    console.log('User found:', mentionedUser.user.tag);

    // Remove the "New" role and add the "Kit" role to the mentioned user
    mentionedUser.roles.remove(newRole)
        .then(() => {
            mentionedUser.roles.add(kitRole)
                .then(() => {
                    console.log('Roles updated successfully');
                    message.delete();
                })
                .catch(error => {
                    console.error('Error adding Kit role:', error);
                });
        })
        .catch(error => {
            console.error('Error removing New role:', error);
        });
}

module.exports = { handleVerifyCommand };






module.exports = { handleGuildMemberAdd, handleVerifyCommand };

