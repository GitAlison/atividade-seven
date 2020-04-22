from rest_framework import viewsets, permissions
from rest_framework.response import Response
from account.models import User
from rest_framework import status
from rest_framework import mixins
from .serializers import SerializerUser, SerializerUserCreateUpdate


class UsersViewSet(
        mixins.CreateModelMixin,
        mixins.ListModelMixin,
        mixins.UpdateModelMixin,
        mixins.RetrieveModelMixin,
        viewsets.GenericViewSet
    ):
    """
    Access GET, POST, PUT  ao Model User
    :return json
    """
    serializer_class = SerializerUser
    queryset = User.objects.all()
    permission_classes = (permissions.IsAuthenticated, )

    def get_queryset(self):
        return User.objects.all().exclude(id=self.request.user.id)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        if request.data['password']:
            serializer = SerializerUserCreateUpdate(instance, data=request.data)
        else:
            serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = SerializerUserCreateUpdate(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


