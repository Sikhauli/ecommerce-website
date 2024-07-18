import React from 'react';
import { Avatar, AvatarGroup } from '@nextui-org/react';

const AvatarGroupComponent = ({ avatars }) => (
    <AvatarGroup isBordered className="justify-start w-auto h-auto">
        {avatars.map((avatar, index) => (
            <Avatar key={index} src={avatar} size="sm" />
        ))}
    </AvatarGroup>
);

export default AvatarGroupComponent;
