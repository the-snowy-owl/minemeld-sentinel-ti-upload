console.log('Loading Microsoft Sentinel Threat Intel Upload API Output WebUI');

(function() {

function MSFTSTIUSideConfigController($scope, MinemeldConfigService, MineMeldRunningConfigStatusService,
                                       toastr, $modal, ConfirmService, $timeout) {
    var vm = this;

    // side config settings
    vm.client_id = undefined;
    vm.client_secret = undefined;
    vm.tenant_id = undefined;
    vm.recommended_action = undefined;
    vm.target_product = undefined;
	vm.workspace_id = undefined;

    vm.loadSideConfig = function() {
        var nodename = $scope.$parent.vm.nodename;

        MinemeldConfigService.getDataFile(nodename + '_side_config')
        .then((result) => {
            if (!result) {
                return;
            }

            if (result.client_id) {
                vm.client_id = result.client_id;
            } else {
                vm.client_id = undefined;
            }

            if (result.client_secret) {
                vm.client_secret = result.client_secret;
            } else {
                vm.client_secret = undefined;
            }

            if (result.tenant_id) {
                vm.tenant_id = result.tenant_id;
            } else {
                vm.tenant_id = undefined;
            }

            if (result.target_product) {
                vm.target_product = result.target_product;
            } else {
                vm.target_product = undefined;
            }
			
			if (result.workspace_id) {
                vm.workspace_id = result.workspace_id;
            } else {
                vm.workspace_id = undefined;
            }

            if (result.recommended_action) {
                vm.recommended_action = result.recommended_action;
            } else {
                vm.recommended_action = undefined;
            }
        }, (error) => {
            toastr.error('ERROR RETRIEVING NODE SIDE CONFIG: ' + error.status);
            vm.client_id = undefined;
            vm.client_secret = undefined;
            vm.tenant_id = undefined;
            vm.recommended_action = undefined;
            vm.target_product = undefined;
			vm.workspace_id = undefined;
        });
    };

    vm.saveSideConfig = function() {
        var side_config = {};
        var hup_node = undefined;
        var nodename = $scope.$parent.vm.nodename;

        if (vm.client_id) {
            side_config.client_id = vm.client_id;
        }
        if (vm.client_secret) {
            side_config.client_secret = vm.client_secret;
        }
        if (vm.tenant_id) {
            side_config.tenant_id = vm.tenant_id;
        }
        if (vm.recommended_action) {
            side_config.recommended_action = vm.recommended_action;
        }
        if (vm.target_product) {
            side_config.target_product = vm.target_product;
        }
		if (vm.workspace_id) {
            side_config.workspace_id = vm.workspace_id;
		}

        return MinemeldConfigService.saveDataFile(
            nodename + '_side_config',
            side_config,
            nodename
        );
    };

    vm.setClientID = function() {
        var mi = $modal.open({
            templateUrl: '/extensions/webui/microsoftTIUWebui/stiu.output.scid.modal.html',
            controller: ['$modalInstance', MSFTSTIUClientIDController],
            controllerAs: 'vm',
            bindToController: true,
            backdrop: 'static',
            animation: false
        });

        mi.result.then((result) => {
            vm.client_id = result.client_id;

            return vm.saveSideConfig().then((result) => {
                toastr.success('CLIENT ID SET');
                vm.loadSideConfig();
            }, (error) => {
                toastr.error('ERROR SETTING CLIENT ID: ' + error.statusText);
            });
        });
    };
    vm.setClientSecret = function() {
        var mi = $modal.open({
            templateUrl: '/extensions/webui/microsoftTIUWebui/stiu.output.scs.modal.html',
            controller: ['$modalInstance', MSFTSTIUClientSecretController],
            controllerAs: 'vm',
            bindToController: true,
            backdrop: 'static',
            animation: false
        });

        mi.result.then((result) => {
            vm.client_secret = result.client_secret;

            return vm.saveSideConfig().then((result) => {
                toastr.success('CLIENT SECRET SET');
                vm.loadSideConfig();
            }, (error) => {
                toastr.error('ERROR SETTING CLIENT SECRET: ' + error.statusText);
            });
        });
    };
    vm.setTenantID = function() {
        var mi = $modal.open({
            templateUrl: '/extensions/webui/microsoftTIUWebui/stiu.output.stid.modal.html',
            controller: ['$modalInstance', MSFTSTIUTenantIDController],
            controllerAs: 'vm',
            bindToController: true,
            backdrop: 'static',
            animation: false
        });

        mi.result.then((result) => {
            vm.tenant_id = result.tenant_id;

            return vm.saveSideConfig().then((result) => {
                toastr.success('TENANT ID SET');
                vm.loadSideConfig();
            }, (error) => {
                toastr.error('ERROR SETTING TENANT ID: ' + error.statusText);
            });
        });
    };

    vm.setTargetProduct = function() {
        var mi = $modal.open({
            templateUrl: '/extensions/webui/microsoftTIUWebui/stiu.output.stp.modal.html',
            controller: ['$modalInstance', MSFTSTIUTargetProductController],
            controllerAs: 'vm',
            bindToController: true,
            backdrop: 'static',
            animation: false
        });

        mi.result.then((result) => {
            vm.target_product = result.target_product;

            return vm.saveSideConfig().then((result) => {
                toastr.success('TARGET PRODUCT SET');
                vm.loadSideConfig();
            }, (error) => {
                toastr.error('ERROR SETTING TARGET PRODUCT: ' + error.statusText);
            });
        });
    };

   vm.setWorkspaceID = function() {
        var mi = $modal.open({
            templateUrl: '/extensions/webui/microsoftTIUWebui/stiu.output.wid.modal.html',
            controller: ['$modalInstance', MSFTSTIUClientIDController],
            controllerAs: 'vm',
            bindToController: true,
            backdrop: 'static',
            animation: false
        });

        mi.result.then((result) => {
            vm.workspace_id = result.workspace_id;

            return vm.saveSideConfig().then((result) => {
                toastr.success('WORKSPACE ID SET');
                vm.loadSideConfig();
            }, (error) => {
                toastr.error('ERROR SETTING WORKSPACE ID: ' + error.statusText);
            });
        });
    };

    vm.setRecommendedAction = function() {
        var mi = $modal.open({
            templateUrl: '/extensions/webui/microsoftTIUWebui/stiu.output.sra.modal.html',
            controller: ['$modalInstance', MSFTSTIURecommendedActionController],
            controllerAs: 'vm',
            bindToController: true,
            backdrop: 'static',
            animation: false
        });

        mi.result.then((result) => {
            vm.recommended_action = result.recommended_action;

            return vm.saveSideConfig().then((result) => {
                toastr.success('RECOMMENDED ACTION SET');
                vm.loadSideConfig();
            }, (error) => {
                toastr.error('ERROR SETTING RECOMMENDED ACTION: ' + error.statusText);
            });
        });
    };

    vm.loadSideConfig();
}

function MSFTSTIUClientSecretController($modalInstance) {
    var vm = this;

    vm.client_secret = undefined;
    vm.client_secret2 = undefined;

    vm.valid = function() {
        if (vm.client_secret2 !== vm.client_secret) {
            angular.element('#fgPassword1').addClass('has-error');
            angular.element('#fgPassword2').addClass('has-error');

            return false;
        }
        angular.element('#fgPassword1').removeClass('has-error');
        angular.element('#fgPassword2').removeClass('has-error');

        if (!vm.client_secret) {
            return false;
        }

        return true;
    };

    vm.save = function() {
        var result = {};

        result.client_secret = vm.client_secret;

        $modalInstance.close(result);
    }

    vm.cancel = function() {
        $modalInstance.dismiss();
    }
}

function MSFTSTIUClientIDController($modalInstance) {
    var vm = this;

    vm.client_id = undefined;

    vm.valid = function() {
        if (!vm.client_id) {
            return false;
        }

        return true;
    };

    vm.save = function() {
        var result = {};

        result.client_id = vm.client_id;

        $modalInstance.close(result);
    }

    vm.cancel = function() {
        $modalInstance.dismiss();
    }
}

function MSFTSTIUTenantIDController($modalInstance) {
    var vm = this;

    vm.tenant_id = undefined;

    vm.valid = function() {
        if (!vm.tenant_id) {
            return false;
        }

        return true;
    };

    vm.save = function() {
        var result = {};

        result.tenant_id = vm.tenant_id;

        $modalInstance.close(result);
    }

    vm.cancel = function() {
        $modalInstance.dismiss();
    }
}

function MSFTSTIUWorkspaceIDController($modalInstance) {
    var vm = this;

    vm.workspace_id = undefined;

    vm.valid = function() {
        if (!vm.workspace_id) {
            return false;
        }

        return true;
    };

    vm.save = function() {
        var result = {};

        result.workspace_id = vm.workspace_id;

        $modalInstance.close(result);
    }

    vm.cancel = function() {
        $modalInstance.dismiss();
    }
}

function MSFTSTIUTargetProductController($modalInstance) {
    var vm = this;

    vm.availableTargetProducts = ['Azure Sentinel'];
    vm.target_product = undefined;

    vm.valid = function() {
        if (!vm.target_product) {
            return false;
        }

        return true;
    };

    vm.save = function() {
        var result = {};

        result.target_product = vm.target_product;

        $modalInstance.close(result);
    }

    vm.cancel = function() {
        $modalInstance.dismiss();
    }
}

function MSFTSTIURecommendedActionController($modalInstance) {
    var vm = this;

    vm.availableActions = ['Alert', 'Allow', 'Block', 'Unknown'];
    vm.recommended_action = undefined;
    vm.valid = function() {
        if (!vm.recommended_action) {
            return false;
        }

        return true;
    };

    vm.save = function() {
        var result = {};

        result.recommended_action = vm.recommended_action.charAt(0).toLowerCase() + vm.recommended_action.slice(1);

        $modalInstance.close(result);
    }

    vm.cancel = function() {
        $modalInstance.dismiss();
    }
}

angular.module('microsoftTIUWebui', [])
    .controller('MSFTSTIUSideConfigController', [
        '$scope', 'MinemeldConfigService', 'MineMeldRunningConfigStatusService',
        'toastr', '$modal', 'ConfirmService', '$timeout',
        MSFTSTIUSideConfigController
    ])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('nodedetail.msftstiuoutputinfo', {
            templateUrl: '/extensions/webui/microsoftTIUWebui/stiu.output.info.html',
            controller: 'NodeDetailInfoController',
            controllerAs: 'vm'
        });
    }])
    .run(['NodeDetailResolver', '$state', function(NodeDetailResolver, $state) {
        NodeDetailResolver.registerClass('microsoft_sentinel_ti_uploadapi.node.Output', {
            tabs: [{
                icon: 'fa fa-circle-o',
                tooltip: 'INFO',
                state: 'nodedetail.msftSTIUoutputinfo',
                active: false
            },
            {
                icon: 'fa fa-area-chart',
                tooltip: 'STATS',
                state: 'nodedetail.stats',
                active: false
            },
            {
                icon: 'fa fa-asterisk',
                tooltip: 'GRAPH',
                state: 'nodedetail.graph',
                active: false
            }]
        });

        // if a nodedetail is already shown, reload the current state to apply changes
        // we should definitely find a better way to handle this...
        if ($state.$current.toString().startsWith('nodedetail.')) {
            $state.reload();
        }
    }]);
})();
