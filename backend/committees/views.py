from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import Committee
from .serializers import CommitteeSerializer


class CommitteeListCreateView(generics.ListCreateAPIView):
    serializer_class = CommitteeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Committee.objects.filter(
            memberships__user=self.request.user
        ).distinct()

    def perform_create(self, serializer):
        committee = serializer.save(
            created_by=self.request.user
        )

        from .models import Membership

        Membership.objects.create(
            user=self.request.user,
            committee=committee,
            role=Membership.Role.ADMIN,
        )