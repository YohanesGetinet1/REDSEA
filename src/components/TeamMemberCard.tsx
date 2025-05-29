import React from 'react';
import { TeamMember } from '../types';

interface TeamMemberCardProps {
  member: TeamMember;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="h-64 overflow-hidden">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
        <p className="text-red-600 font-medium mb-3">{member.role}</p>
        <p className="text-gray-600">{member.bio}</p>
      </div>
    </div>
  );
};

export default TeamMemberCard;