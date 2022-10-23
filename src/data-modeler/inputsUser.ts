export const formatAccessToSend = (modules: any[]) => {
    return modules.reduce((before: any[], after) => {
        return (before = [
            ...before,
            ...after.accesses.reduce((beforeAccess: any[], afterAccess: any) => {
                    if (afterAccess.isDone) {
                        return (beforeAccess = [
                            ...beforeAccess,
                            {
                                accessId: afterAccess.accessId,
                                permission: afterAccess.permission ? "2" : "1"
                            }
                        ]);
                    }
                    return beforeAccess;
                },
                []
            )
        ])
    }, []);
}
