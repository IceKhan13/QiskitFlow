from rest_framework.permissions import BasePermission


class UserExperimentPermission(BasePermission):
    """ Permission for only author to access experiment. """
    def has_object_permission(self, request, view, obj):
        return request.user == obj.author


class UserRunPermission(BasePermission):
    """ Permission for only author to access experiment runs. """
    def has_object_permission(self, request, view, obj):
        return request.user == obj.experiment.author or obj.is_public
